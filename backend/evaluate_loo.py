"""
Leave-one-out (LOO) evaluation of the production model.

This is NOT a third predictor. It never runs for a live farmer request.
It's an offline report you run once (after train_model.py, or whenever the
dataset changes) that answers: "when the model has never seen this exact
case before, how often is it right -- broken down by disease?"

The output, model/loo_reliability.json, is what main.py can later load and
use to attach a trust weight to the trained model's live prediction.

Mechanics, per row i of the dataset:
    1. Remove row i entirely.
    2. Fit a fresh copy of the SAME pipeline (same model type/params
       train_model.py chose) on the remaining rows.
    3. Predict row i. Record: predicted disease, true disease, and the
       model's confidence (probability it assigned to its own top pick).
    4. Put row i back, move to row i+1.

Known limitation, flagged explicitly in the output: a disease with only 1
sample in the whole dataset can never be evaluated by LOO, because holding
out its only example leaves the model with zero training examples of it.
Those diseases are reported as "insufficient_data" rather than given a
(meaningless) accuracy number.

Usage:
    python evaluate_loo.py /path/to/maweshi_preprocessed.csv
"""
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.base import clone
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import LeaveOneOut
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder

from features import CATEGORICAL_COLS, TARGET_COL, load_dataset, get_symptom_cols, build_preprocessor

DATA_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("maweshi_preprocessed.csv")
MODEL_DIR = Path(__file__).parent / "model"
MIN_SAMPLES_FOR_RELIABILITY = 5  # below this, LOO accuracy is too noisy to trust

CANDIDATES = {
    "random_forest": RandomForestClassifier(
        n_estimators=150, max_depth=None, class_weight="balanced", random_state=42
    ),
    "knn": KNeighborsClassifier(n_neighbors=5, weights="distance"),
}


def get_chosen_model_name():
    """Use whichever model train_model.py actually chose as best, so the LOO
    report always evaluates the model that's really being shipped."""
    metrics_path = MODEL_DIR / "metrics.json"
    if metrics_path.exists():
        chosen = json.loads(metrics_path.read_text()).get("chosen_model")
        if chosen in CANDIDATES:
            return chosen
    return "random_forest"


def run_loo(X, y_enc, label_encoder, model_name):
    n = len(X)
    loo = LeaveOneOut()
    true_labels = np.empty(n, dtype=int)
    pred_labels = np.empty(n, dtype=int)
    confidences = np.empty(n, dtype=float)

    for progress, (train_idx, test_idx) in enumerate(loo.split(X)):
        pipe = Pipeline([("prep", build_preprocessor()), ("clf", clone(CANDIDATES[model_name]))])
        pipe.fit(X.iloc[train_idx], y_enc[train_idx])

        proba = pipe.predict_proba(X.iloc[test_idx])[0]
        pred_class_idx_in_fold = np.argmax(proba)
        # map back from this fold's local class ordering to the global encoding
        pred_label = pipe.named_steps["clf"].classes_[pred_class_idx_in_fold]

        true_labels[test_idx[0]] = y_enc[test_idx[0]]
        pred_labels[test_idx[0]] = pred_label
        confidences[test_idx[0]] = proba[pred_class_idx_in_fold]

        if (progress + 1) % 100 == 0 or (progress + 1) == n:
            print(f"  LOO progress: {progress + 1}/{n}")

    return true_labels, pred_labels, confidences


def build_per_disease_report(true_labels, pred_labels, label_encoder, class_counts):
    correct = (true_labels == pred_labels)
    report = {}
    for class_idx, disease in enumerate(label_encoder.classes_):
        mask = true_labels == class_idx
        n_samples = int(mask.sum())
        if n_samples == 0:
            continue
        if n_samples < 2:
            report[disease] = {
                "n_samples": n_samples,
                "loo_accuracy": None,
                "reliable": False,
                "note": "Only 1 sample in dataset -- LOO cannot evaluate this "
                        "disease (holding out its only example leaves zero "
                        "training examples of it).",
            }
            continue
        acc = float(correct[mask].mean())
        reliable = n_samples >= MIN_SAMPLES_FOR_RELIABILITY
        entry = {
            "n_samples": n_samples,
            "loo_accuracy": round(acc, 4),
            "reliable": reliable,
        }
        if not reliable:
            entry["note"] = (f"Only {n_samples} samples -- LOO accuracy is "
                              f"high-variance below {MIN_SAMPLES_FOR_RELIABILITY} samples.")
        report[disease] = entry
    return report


def build_calibration_curve(confidences, correct, n_bins=10):
    """Classic reliability-diagram data: bucket predictions by confidence,
    check whether accuracy in each bucket actually matches that confidence."""
    bins = np.linspace(0, 1, n_bins + 1)
    curve = []
    ece = 0.0  # expected calibration error
    n = len(confidences)
    for i in range(n_bins):
        lo, hi = bins[i], bins[i + 1]
        in_bin = (confidences >= lo) & (confidences < hi if i < n_bins - 1 else confidences <= hi)
        count = int(in_bin.sum())
        if count == 0:
            continue
        bin_acc = float(correct[in_bin].mean())
        bin_conf = float(confidences[in_bin].mean())
        curve.append({
            "confidence_range": f"{lo:.1f}-{hi:.1f}",
            "count": count,
            "mean_predicted_confidence": round(bin_conf, 4),
            "actual_accuracy": round(bin_acc, 4),
        })
        ece += (count / n) * abs(bin_acc - bin_conf)
    return curve, round(ece, 4)


def main():
    df = load_dataset(DATA_PATH)
    symptom_cols = get_symptom_cols(df)

    X = df[CATEGORICAL_COLS + symptom_cols].copy()
    y = df[TARGET_COL].copy()

    class_counts = y.value_counts()
    singleton_diseases = class_counts[class_counts < 2].index.tolist()
    low_sample_diseases = class_counts[
        (class_counts >= 2) & (class_counts < MIN_SAMPLES_FOR_RELIABILITY)
    ].index.tolist()
    if singleton_diseases:
        print(f"NOTE: {len(singleton_diseases)} diseases have only 1 sample and "
              f"cannot be LOO-evaluated: {singleton_diseases}")
    if low_sample_diseases:
        print(f"NOTE: {len(low_sample_diseases)} diseases have 2-4 samples, "
              f"their LOO accuracy will be flagged unreliable: {low_sample_diseases}")

    label_encoder = LabelEncoder()
    y_enc = label_encoder.fit_transform(y)

    model_name = get_chosen_model_name()
    print(f"Evaluating '{model_name}' (matches the model train_model.py shipped)")
    print(f"Running leave-one-out over {len(X)} rows -- this retrains the "
          f"model once per row, so it will take a few minutes.")
    true_labels, pred_labels, confidences = run_loo(X, y_enc, label_encoder, model_name)
    correct = (true_labels == pred_labels)

    overall_accuracy = float(correct.mean())
    per_disease = build_per_disease_report(true_labels, pred_labels, label_encoder, class_counts)
    calibration_curve, ece = build_calibration_curve(confidences, correct)

    output = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "n_evaluated": len(X),
        "overall_loo_accuracy": round(overall_accuracy, 4),
        "expected_calibration_error": ece,
        "min_samples_for_reliability": MIN_SAMPLES_FOR_RELIABILITY,
        "per_disease": per_disease,
        "calibration_curve": calibration_curve,
    }

    out_path = MODEL_DIR / "loo_reliability.json"
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nOverall LOO accuracy: {overall_accuracy:.4f}")
    print(f"Expected calibration error: {ece:.4f} (closer to 0 = confidence scores are trustworthy)")
    print(f"Saved to {out_path}")


if __name__ == "__main__":
    main()
