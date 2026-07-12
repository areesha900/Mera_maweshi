"""
SQLAlchemy models.

Identity note: there's no login in this app (by design, for farmer
convenience). `device_id` is a UUID the app generates once on first launch
and stores locally -- it's the closest thing to an "account" here, but it's
self-asserted by the client, not verified. `phone` is stored as a plain
optional field so a farmer could manually look up their data on a new
device later, but it is NOT an authentication mechanism -- treat any
device_id/phone match as good-enough identification for a free diagnosis
app, not as something that gates sensitive data.
"""
from datetime import datetime, timezone

from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.db import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Farmer(Base):
    __tablename__ = "farmers"

    device_id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    province = Column(String, nullable=False)
    district = Column(String, nullable=False)
    tehsil = Column(String, nullable=False)
    created_at = Column(DateTime, default=utcnow)

    diagnoses = relationship(
        "Diagnosis", back_populates="farmer", cascade="all, delete-orphan"
    )


class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    device_id = Column(String, ForeignKey("farmers.device_id"), nullable=False, index=True)

    animal_type = Column(String, nullable=False)   # Cattle / Buffalo / Goat / Sheep
    sex = Column(String, nullable=False)
    age_range = Column(String, nullable=False)      # New Born / Growing / Adult
    symptoms = Column(JSON, nullable=False)          # list[str] of symptom keys

    llm_disease_en = Column(String, nullable=True)
    llm_disease_ur = Column(String, nullable=True)
    llm_confidence = Column(Integer, nullable=True)

    model_disease_en = Column(String, nullable=True)
    model_disease_ur = Column(String, nullable=True)
    model_confidence = Column(Integer, nullable=True)

    serious = Column(Boolean, default=False)
    status = Column(String, default="ongoing")  # "ongoing" | "treated"

    # Snapshot of first-aid text as shown at diagnosis time, for both sources.
    # Stored so editing disease_reference.py later doesn't rewrite history.
    # Shape: {"llm": {"en": [...], "ur": [...]}, "model": {"en": [...], "ur": [...]}}
    first_aid_snapshot = Column(JSON, nullable=True)

    created_at = Column(DateTime, default=utcnow)

    farmer = relationship("Farmer", back_populates="diagnoses")
