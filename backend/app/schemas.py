from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel


# ---------- Farmers ----------

class FarmerIn(BaseModel):
    device_id: str
    name: str
    phone: Optional[str] = None
    province: str
    district: str
    tehsil: str


class FarmerOut(BaseModel):
    device_id: str
    name: str
    phone: Optional[str] = None
    province: str
    district: str
    tehsil: str
    created_at: datetime

    class Config:
        from_attributes = True


# ---------- Diagnoses ----------

class DiagnosisSourceIn(BaseModel):
    """One side of a diagnosis (LLM or trained model), as shown to the farmer."""
    disease_en: str
    disease_ur: str
    confidence: int
    serious: bool
    first_aid_en: List[str]
    first_aid_ur: List[str]


class DiagnosisIn(BaseModel):
    device_id: str
    animal_type: str
    sex: str
    age_range: str
    symptoms: List[str]
    llm: Optional[DiagnosisSourceIn] = None
    model: Optional[DiagnosisSourceIn] = None


class DiagnosisOut(BaseModel):
    id: int
    device_id: str
    animal_type: str
    sex: str
    age_range: str
    symptoms: List[str]
    llm_disease_en: Optional[str] = None
    llm_disease_ur: Optional[str] = None
    llm_confidence: Optional[int] = None
    model_disease_en: Optional[str] = None
    model_disease_ur: Optional[str] = None
    model_confidence: Optional[int] = None
    serious: bool
    status: str
    first_aid_snapshot: Optional[dict] = None
    created_at: datetime

    class Config:
        from_attributes = True


class DiagnosisStatusIn(BaseModel):
    device_id: str  # must match the record's owner -- see note in the PATCH route
    status: Literal["ongoing", "treated"]
