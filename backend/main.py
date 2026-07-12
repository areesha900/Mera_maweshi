"""
Mera Maweshi backend — Phase 2: LLM + trained-model side-by-side diagnosis.

Run:
    uvicorn main:app --reload --port 8000

Requires:
    GROQ_API_KEY set in the environment (see .env.example)
"""
import json
import os
import re
from pathlib import Path
from typing import List, Optional
import joblib
import numpy as np
import pandas as pd
from groq import Groq
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.disease_reference import get_reference
from app.db import get_db, init_db
from app import models, schemas

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

init_db()

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


# --- disease vocabulary (keeps LLM output aligned to the model's label set) ---
def get_disease_vocabulary() -> List[str]:
    if label_encoder is None:
        return []
    return list(label_encoder.classes_)


# --- Urdu script validation ---
# Urdu uses the Arabic script block. If the LLM drifts into English,
# Roman Urdu, or another language, this ratio will fall off a cliff.
URDU_SCRIPT_RE = re.compile(r"[\u0600-\u06FF\u0750-\u077F]")


def is_valid_urdu(text: str, min_ratio: float = 0.6) -> bool:
    """Check that at least `min_ratio` of non-space chars are Urdu/Arabic script."""
    if not text or not text.strip():
        return False
    stripped = text.replace(" ", "")
    if not stripped:
        return False
    urdu_chars = len(URDU_SCRIPT_RE.findall(stripped))
    return (urdu_chars / len(stripped)) >= min_ratio


def validate_urdu_fields(parsed: dict) -> List[str]:
    """Returns a list of field names that failed Urdu validation."""
    bad_fields = []
    if not is_valid_urdu(parsed.get("disease_ur", "")):
        bad_fields.append("disease_ur")
    if parsed.get("reasoning_ur") and not is_valid_urdu(parsed["reasoning_ur"]):
        bad_fields.append("reasoning_ur")
    for step in parsed.get("first_aid_ur", []):
        if not is_valid_urdu(step):
            bad_fields.append("first_aid_ur")
            break
    return bad_fields


# --- LLM ---
LLM_SYSTEM_PROMPT = """You are a veterinary triage assistant helping smallholder farmers in Pakistan \
diagnose livestock illness from reported symptoms. You are NOT a replacement for a vet visit for \
serious or ambiguous cases.

You will be given the predictions of a trained statistical model as a reference. This model was \
trained on real veterinary case data for Pakistani livestock, so treat its top prediction as a \
strong prior. Only diverge from it if the reported symptoms clearly point elsewhere — and if you do, \
say why in reasoning_en.

IMPORTANT: "disease_en" MUST be chosen exactly (same spelling/casing) from this fixed list of \
diseases the system recognizes (both in English and Urdu)— do not invent a name outside this list:
{disease_list}

LANGUAGE RULES FOR ALL "_ur" FIELDS (disease_ur, reasoning_ur, first_aid_ur):
- Write ONLY in Urdu, using the Urdu/Arabic script (اردو رسم الخط).
- Do NOT use Roman Urdu (Urdu written in Latin letters).
- Do NOT use Arabic, Persian, Pashto, Hindi, or any other language.
- Do NOT mix English words into the Urdu text, including technical terms — translate them into \
their common Urdu equivalent used by Pakistani farmers/vets (e.g. use "بخار" not "fever").
- Every "_ur" field must be understandable to an Urdu-reading farmer in Pakistan with zero English.

Respond with ONLY a single JSON object, no other text, no markdown fences, matching exactly this shape:
{{
  "disease_en": "string, must be one of the diseases listed above",
  "disease_ur": "string, disease name written in Urdu script only",
  "confidence": integer 0-100,
  "serious": boolean, true if this warrants urgent vet attention,
  "reasoning_en": "one to two sentence explanation of why, in English",
  "reasoning_ur": "the same explanation in Urdu script only, no English or Roman Urdu",
  "first_aid_en": ["short actionable first aid step", "..."],
  "first_aid_ur": ["same steps in Urdu script only, no English or Roman Urdu", "..."]
}}
Keep first_aid lists to 3-4 concise, practical steps a farmer without medical training can follow \
before reaching a vet. Always include contacting a vet as a step for serious conditions."""



# LLM_SYSTEM_PROMPT = """You are a veterinary triage assistant helping smallholder farmers in Pakistan \
# diagnose livestock illness from reported symptoms. You are NOT a replacement for a vet visit for \
# serious or ambiguous cases.

# Respond with ONLY a single JSON object, no other text, no markdown fences, matching exactly this shape:
# {
#   "disease_en": "string, most likely disease/condition name in English",
#   "disease_ur": "string, the disease name in Urdu",
#   "confidence": integer 0-100,
#   "serious": boolean, true if this warrants urgent vet attention,
#   "reasoning_en": "one to two sentence explanation of why, in English",
#   "reasoning_ur": "the same explanation translated into Urdu",
#   "first_aid_en": ["short actionable first aid step", "..."],
#   "first_aid_ur": ["same steps translated to Urdu", "..."]
# }
# Keep first_aid lists to 3-4 concise, practical steps a farmer without medical training can follow \
# before reaching a vet. Always include contacting a vet as a step for serious conditions."""


def run_llm(req: DiagnoseRequest, model_result: Optional[DiagnosisResult] = None) -> DiagnosisResult:
    if groq_client is None:
        raise RuntimeError("GROQ_API_KEY not configured")

    symptom_text = ", ".join(s.replace("_", " ") for s in req.symptoms) or "none reported"

    model_context = ""
    if model_result is not None:
        diff_lines = "\n".join(
            f"  {i+1}. {d['disease_en']} ({d['confidence']:.1f}%)"
            for i, d in enumerate(model_result.differential or [])
        )
        model_context = (
            f"\nTrained model's top predictions for this case:\n{diff_lines}\n"
            f"Its top pick was: {model_result.disease_en} "
            f"(confidence {model_result.confidence}%).\n"
        )

    user_prompt = (
        f"Animal: {req.animal}\nSex: {req.sex}\nAge range: {req.age}\n"
        f"Reported symptoms: {symptom_text}\n"
        f"{model_context}\n"
        "Give your best diagnosis as the JSON object described."
    )

    disease_list = ", ".join(get_disease_vocabulary())
    system_prompt = LLM_SYSTEM_PROMPT.format(disease_list=disease_list)

    def call_groq(extra_reminder: str = "") -> dict:
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt + extra_reminder},
        ]
        response = groq_client.chat.completions.create(
            model=GROQ_MODEL_NAME,
            max_tokens=800,
            temperature=0.2,  # lower temp for consistent, model-aligned output
            messages=messages,
            response_format={"type": "json_object"},
        )
        raw_text = response.choices[0].message.content.strip()
        return json.loads(raw_text)

    try:
        parsed = call_groq()
    except json.JSONDecodeError as e:
        raise RuntimeError(f"LLM returned non-JSON output: {e}") from e

    # First attempt failed Urdu validation → retry once with a sharper reminder
    bad_fields = validate_urdu_fields(parsed)
    if bad_fields:
        try:
            retry_prompt = (
                "\n\nREMINDER: your previous attempt did not use pure Urdu script for "
                f"these fields: {', '.join(set(bad_fields))}. Rewrite ALL _ur fields "
                "in Urdu script only — no English, no Roman Urdu, no other language."
            )
            retried = call_groq(extra_reminder=retry_prompt)
            parsed = retried
            bad_fields = validate_urdu_fields(parsed)
        except (json.JSONDecodeError, Exception):
            pass  # keep original parsed/bad_fields, fall through to fallback below

    # Still bad after retry → fall back to curated reference data instead of showing garbage
    if bad_fields and model_result is not None:
        ref = get_reference(model_result.disease_en)
        if "disease_ur" in bad_fields:
            parsed["disease_ur"] = ref["ur"]
        if "first_aid_ur" in bad_fields:
            parsed["first_aid_ur"] = ref["first_aid_ur"]
        if "reasoning_ur" in bad_fields:
            parsed["reasoning_ur"] = None  # no curated reasoning to fall back on — hide rather than show garbage

    # Guardrail: if LLM ignores the closed vocabulary, snap it back to model's top pick
    valid_diseases = set(get_disease_vocabulary())
    if valid_diseases and parsed["disease_en"] not in valid_diseases:
        if model_result is not None:
            parsed["disease_en"] = model_result.disease_en
            parsed["disease_ur"] = model_result.disease_ur

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


# --- route: run model FIRST, then pass its result into the LLM call ---
@app.post("/api/diagnose", response_model=DiagnoseResponse)
def diagnose(req: DiagnoseRequest):
    if not req.symptoms:
        raise HTTPException(400, "At least one symptom is required")

    result = DiagnoseResponse()

    try:
        result.model = run_trained_model(req)
    except Exception as e:  # noqa: BLE001 — surface any failure to the client, don't crash the other path
        result.model_error = str(e)

    try:
        result.llm = run_llm(req, model_result=result.model)
    except Exception as e:  # noqa: BLE001
        result.llm_error = str(e)

    if result.llm is None and result.model is None:
        raise HTTPException(500, f"Both diagnosis paths failed: {result.llm_error} | {result.model_error}")

    return result


# ---------- Farmer profile ----------
# device_id is a UUID the app generates once on first launch (see
# lib/deviceId.ts). There's no verification of it -- it's the app's
# stand-in for an "account" without asking farmers to log in. Treat it as
# a convenience identifier, not a security boundary.

@app.post("/api/farmers", response_model=schemas.FarmerOut)
def upsert_farmer(payload: schemas.FarmerIn, db: Session = Depends(get_db)):
    farmer = db.get(models.Farmer, payload.device_id)
    if farmer is None:
        farmer = models.Farmer(device_id=payload.device_id)
        db.add(farmer)

    farmer.name = payload.name
    farmer.phone = payload.phone
    farmer.province = payload.province
    farmer.district = payload.district
    farmer.tehsil = payload.tehsil

    db.commit()
    db.refresh(farmer)
    return farmer


@app.get("/api/farmers/{device_id}", response_model=schemas.FarmerOut)
def get_farmer(device_id: str, db: Session = Depends(get_db)):
    farmer = db.get(models.Farmer, device_id)
    if farmer is None:
        raise HTTPException(404, "No farmer profile found for this device")
    return farmer


# ---------- Diagnosis history ----------

@app.post("/api/diagnoses", response_model=schemas.DiagnosisOut)
def save_diagnosis(payload: schemas.DiagnosisIn, db: Session = Depends(get_db)):
    if db.get(models.Farmer, payload.device_id) is None:
        raise HTTPException(
            400, "Unknown device_id -- create a farmer profile via POST /api/farmers first"
        )
    if payload.llm is None and payload.model is None:
        raise HTTPException(400, "At least one of llm/model results is required")

    first_aid_snapshot = {
        "llm": {"en": payload.llm.first_aid_en, "ur": payload.llm.first_aid_ur} if payload.llm else None,
        "model": {"en": payload.model.first_aid_en, "ur": payload.model.first_aid_ur} if payload.model else None,
    }

    record = models.Diagnosis(
        device_id=payload.device_id,
        animal_type=payload.animal_type,
        sex=payload.sex,
        age_range=payload.age_range,
        symptoms=payload.symptoms,
        llm_disease_en=payload.llm.disease_en if payload.llm else None,
        llm_disease_ur=payload.llm.disease_ur if payload.llm else None,
        llm_confidence=payload.llm.confidence if payload.llm else None,
        model_disease_en=payload.model.disease_en if payload.model else None,
        model_disease_ur=payload.model.disease_ur if payload.model else None,
        model_confidence=payload.model.confidence if payload.model else None,
        serious=bool((payload.llm and payload.llm.serious) or (payload.model and payload.model.serious)),
        status="ongoing",
        first_aid_snapshot=first_aid_snapshot,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@app.get("/api/diagnoses", response_model=List[schemas.DiagnosisOut])
def list_diagnoses(device_id: str, db: Session = Depends(get_db)):
    return (
        db.query(models.Diagnosis)
        .filter(models.Diagnosis.device_id == device_id)
        .order_by(models.Diagnosis.created_at.desc())
        .all()
    )


@app.patch("/api/diagnoses/{diagnosis_id}", response_model=schemas.DiagnosisOut)
def update_diagnosis_status(
    diagnosis_id: int, payload: schemas.DiagnosisStatusIn, db: Session = Depends(get_db)
):
    record = db.get(models.Diagnosis, diagnosis_id)
    if record is None:
        raise HTTPException(404, "Diagnosis not found")
    # Ownership check: only the device_id that created this record can update
    # it. Since device_id isn't verified server-side, this stops accidental
    # cross-farmer edits but not a deliberately spoofed device_id -- fine for
    # this app's stakes, not a real access-control boundary.
    if record.device_id != payload.device_id:
        raise HTTPException(403, "device_id does not match this diagnosis's owner")

    record.status = payload.status
    db.commit()
    db.refresh(record)
    return record


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "model_loaded": pipeline is not None,
        "llm_configured": groq_client is not None,
        "llm_model": GROQ_MODEL_NAME,
    }