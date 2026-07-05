"""
Mera Maweshi backend — Phase 2: LLM + trained-model side-by-side diagnosis.

Run:
    uvicorn main:app --reload --port 8000

Requires:
    GROQ_API_KEY set in the environment (see .env.example)
"""
import json
import os
from pathlib import Path
from typing import List, Optional
import joblib
import numpy as np
import pandas as pd
from groq import Groq
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.disease_reference import get_reference

load_dotenv()

MODEL_DIR = Path(__file__).parent / "model"
GROQ_MODEL_NAME = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

app = FastAPI(title="Mera Maweshi Diagnosis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten before production
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Load trained-model artifacts ----------
try:
    pipeline = joblib.load(MODEL_DIR / "pipeline.joblib")
    label_encoder = joblib.load(MODEL_DIR / "label_encoder.joblib")
    symptom_cols = joblib.load(MODEL_DIR / "symptom_cols.joblib")
except FileNotFoundError:
    pipeline = label_encoder = symptom_cols = None  # run train_model.py first

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY")) if os.getenv("GROQ_API_KEY") else None


class DiagnoseRequest(BaseModel):
    animal: str          # Cattle / Buffalo / Goat / Sheep
    sex: str             # Male / Female
    age: str             # New Born / Growing / Adult
    symptoms: List[str]  # list of symptom keys, e.g. ["Mild_Cough", "Anorexia"]
    lang: Optional[str] = "en"


class DiagnosisResult(BaseModel):
    source: str  # "llm" | "model"
    disease_en: str
    disease_ur: str
    confidence: int
    serious: bool
    first_aid_en: List[str]
    first_aid_ur: List[str]
    reasoning_en: Optional[str] = None
    reasoning_ur: Optional[str] = None
    differential: Optional[List[dict]] = None  # model's top-3, for transparency


class DiagnoseResponse(BaseModel):
    llm: Optional[DiagnosisResult] = None
    model: Optional[DiagnosisResult] = None
    llm_error: Optional[str] = None
    model_error: Optional[str] = None


# --- trained model ---
def run_trained_model(req: DiagnoseRequest) -> DiagnosisResult:
    if pipeline is None:
        raise RuntimeError("Model not trained yet — run train_model.py first")

    row = {"Name": req.animal, "SexType": req.sex, "AgeRange": req.age}
    for col in symptom_cols:
        row[col] = 1 if col in req.symptoms else 0
    X = pd.DataFrame([row])[["Name", "SexType", "AgeRange"] + symptom_cols]

    proba = pipeline.predict_proba(X)[0]
    top_idx = np.argsort(proba)[::-1][:3]
    top_diseases = label_encoder.inverse_transform(top_idx)
    top_confidences = (proba[top_idx] * 100).round(1)

    best_disease = top_diseases[0]
    best_conf = int(round(top_confidences[0]))
    ref = get_reference(best_disease)

    return DiagnosisResult(
        source="model",
        disease_en=best_disease,
        disease_ur=ref["ur"],
        confidence=best_conf,
        serious=ref["serious"],
        first_aid_en=ref["first_aid_en"],
        first_aid_ur=ref["first_aid_ur"],
        differential=[
            {"disease_en": d, "disease_ur": get_reference(d)["ur"], "confidence": float(c)}
            for d, c in zip(top_diseases, top_confidences)
],
    )


# --- LLM ---
LLM_SYSTEM_PROMPT = """You are a veterinary triage assistant helping smallholder farmers in Pakistan \
diagnose livestock illness from reported symptoms. You are NOT a replacement for a vet visit for \
serious or ambiguous cases.

Respond with ONLY a single JSON object, no other text, no markdown fences, matching exactly this shape:
{
  "disease_en": "string, most likely disease/condition name in English",
  "disease_ur": "string, the disease name in Urdu",
  "confidence": integer 0-100,
  "serious": boolean, true if this warrants urgent vet attention,
  "reasoning_en": "one to two sentence explanation of why, in English",
  "reasoning_ur": "the same explanation translated into Urdu",
  "first_aid_en": ["short actionable first aid step", "..."],
  "first_aid_ur": ["same steps translated to Urdu", "..."]
}
Keep first_aid lists to 3-4 concise, practical steps a farmer without medical training can follow \
before reaching a vet. Always include contacting a vet as a step for serious conditions."""


def run_llm(req: DiagnoseRequest) -> DiagnosisResult:
    if groq_client is None:
        raise RuntimeError("GROQ_API_KEY not configured")

    symptom_text = ", ".join(s.replace("_", " ") for s in req.symptoms) or "none reported"
    user_prompt = (
        f"Animal: {req.animal}\nSex: {req.sex}\nAge range: {req.age}\n"
        f"Reported symptoms: {symptom_text}\n\n"
        "Give your best diagnosis as the JSON object described."
    )

    response = groq_client.chat.completions.create(
        model=GROQ_MODEL_NAME,
        max_tokens=800,
        messages=[
            {"role": "system", "content": LLM_SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
    )

    raw_text = response.choices[0].message.content.strip()

    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"LLM returned non-JSON output: {e}") from e

    return DiagnosisResult(
        source="llm",
        disease_en=parsed["disease_en"],
        disease_ur=parsed["disease_ur"],
        confidence=int(parsed["confidence"]),
        serious=bool(parsed["serious"]),
        first_aid_en=parsed["first_aid_en"],
        first_aid_ur=parsed["first_aid_ur"],
        reasoning_en=parsed.get("reasoning_en"),
        reasoning_ur=parsed.get("reasoning_ur"),
    )


# --- route ---
@app.post("/api/diagnose", response_model=DiagnoseResponse)
def diagnose(req: DiagnoseRequest):
    if not req.symptoms:
        raise HTTPException(400, "At least one symptom is required")

    result = DiagnoseResponse()

    try:
        result.llm = run_llm(req)
    except Exception as e:  # noqa: BLE001 — surface any failure to the client, don't crash the other path
        result.llm_error = str(e)

    try:
        result.model = run_trained_model(req)
    except Exception as e:  # noqa: BLE001
        result.model_error = str(e)

    if result.llm is None and result.model is None:
        raise HTTPException(500, f"Both diagnosis paths failed: {result.llm_error} | {result.model_error}")

    return result


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "model_loaded": pipeline is not None,
        "llm_configured": groq_client is not None,
        "llm_model": GROQ_MODEL_NAME,
    }