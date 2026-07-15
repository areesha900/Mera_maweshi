"""
Shared feature definitions for the Maweshi diagnosis model.

Both train_model.py (fits the production pipeline) and evaluate_loo.py
(runs leave-one-out evaluation on that same pipeline shape) import from
here, so the two can never quietly drift out of sync.
"""
from pathlib import Path

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

CATEGORICAL_COLS = ["Name", "SexType", "AgeRange"]  # Name = animal species
TARGET_COL = "DiseaseName"


def load_dataset(path: Path) -> pd.DataFrame:
    """Load the preprocessed CSV and drop rows with no label."""
    df = pd.read_csv(path)
    return df.dropna(subset=[TARGET_COL])


def get_symptom_cols(df: pd.DataFrame) -> list[str]:
    return [c for c in df.columns if c not in CATEGORICAL_COLS + [TARGET_COL]]


def build_preprocessor() -> ColumnTransformer:
    """The exact same preprocessing used at training time and at LOO-eval time."""
    return ColumnTransformer(
        transformers=[
            ("cat", OneHotEncoder(handle_unknown="ignore"), CATEGORICAL_COLS),
        ],
        remainder="passthrough",  # symptom binary columns pass through as-is
    )
