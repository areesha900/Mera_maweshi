from datetime import datetime, timezone
from typing import List, Literal, Optional

from pydantic import BaseModel, field_serializer


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

    @field_serializer("created_at")
    def _serialize_created_at(self, dt: datetime, _info):
        # for local time display
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.isoformat()


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

    @field_serializer("created_at")
    def _serialize_created_at(self, dt: datetime, _info):
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.isoformat()


class DiagnosisStatusIn(BaseModel):
    device_id: str  # must match the record's owner
    status: Literal["ongoing", "treated"]