"""
Trains the 'our trained model' side of the diagnosis comparison.
Run once (or whenever the dataset changes) to produce model/*.joblib artifacts
that main.py loads at request time.

Usage:
    python train_model.py /path/to/maweshi_preprocessed.csv
"""
import sys
import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

DATA_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("maweshi_preprocessed.csv")
MODEL_DIR = Path(__file__).parent / "model"
MODEL_DIR.mkdir(exist_ok=True)

CATEGORICAL_COLS = ["Name", "SexType", "AgeRange"]  # Name = animal species
TARGET_COL = "DiseaseName"


def manual_stratified_split(X, y, test_frac=0.2, min_train=1, seed=42):
    """Regular train_test_split(stratify=y) blows up when a class has 1 member.
    This keeps every singleton class entirely in train, and stratifies the rest."""
    rng = np.random.RandomState(seed)
    counts = y.value_counts()
    singleton_classes = counts[counts < 2].index
    idx_all = np.arange(len(y))
    is_singleton = y.isin(singleton_classes).values

    train_idx = list(idx_all[is_singleton])
    rest_idx = idx_all[~is_singleton]
    y_rest = y.iloc[rest_idx]

    tr_idx, te_idx = train_test_split(
        rest_idx, test_size=test_frac, random_state=seed, stratify=y_rest
    )
    train_idx.extend(tr_idx)
    return np.array(train_idx), np.array(te_idx)


def main():
    df = pd.read_csv(DATA_PATH)
    df = df.dropna(subset=[TARGET_COL])

    symptom_cols = [c for c in df.columns if c not in CATEGORICAL_COLS + [TARGET_COL]]

    X = df[CATEGORICAL_COLS + symptom_cols].copy()
    y = df[TARGET_COL].copy()

    label_encoder = LabelEncoder()
    y_enc = label_encoder.fit_transform(y)

    preprocessor = ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_COLS),
        ],
        remainder="passthrough",  # symptom binary columns pass through as-is
    )

    candidates = {
        "random_forest": RandomForestClassifier(
            n_estimators=150, max_depth=None, class_weight="balanced", random_state=42
        ),
        "knn": KNeighborsClassifier(n_neighbors=5, weights="distance"),
    }

    train_idx, test_idx = manual_stratified_split(X, pd.Series(y_enc), test_frac=0.2)
    X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
    y_train, y_test = y_enc[train_idx], y_enc[test_idx]

    results = {}
    best_name, best_pipe, best_score = None, None, -1
    for name, clf in candidates.items():
        pipe = Pipeline([("prep", preprocessor), ("clf", clf)])
        pipe.fit(X_train, y_train)
        preds = pipe.predict(X_test)
        acc = accuracy_score(y_test, preds)
        f1 = f1_score(y_test, preds, average="weighted", zero_division=0)
        results[name] = {"accuracy": round(acc, 4), "f1_weighted": round(f1, 4)}
        print(f"{name}: accuracy={acc:.4f}  f1_weighted={f1:.4f}")
        if acc > best_score:
            best_name, best_pipe, best_score = name, pipe, acc

    print(f"\nBest model: {best_name} (accuracy={best_score:.4f})")

    # Refit the winning pipeline on ALL data for production use (more coverage,
    # important given several disease classes only have 1-3 samples total).
    final_pipe = Pipeline([("prep", preprocessor), ("clf", candidates[best_name])])
    final_pipe.fit(X, y_enc)

    joblib.dump(final_pipe, MODEL_DIR / "pipeline.joblib")
    joblib.dump(label_encoder, MODEL_DIR / "label_encoder.joblib")
    joblib.dump(symptom_cols, MODEL_DIR / "symptom_cols.joblib")

    with open(MODEL_DIR / "metrics.json", "w") as f:
        json.dump(
            {"holdout_results": results, "chosen_model": best_name,
             "n_train": len(X), "n_classes": len(label_encoder.classes_)},
            f, indent=2,
        )

    print(f"\nSaved model artifacts to {MODEL_DIR}/")


if __name__ == "__main__":
    main()
