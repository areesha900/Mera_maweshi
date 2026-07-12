"""
Database setup for Mera Maweshi.

Local dev: no DATABASE_URL set -> falls back to a SQLite file
(backend/maweshi.db). Nothing to install or configure, just works.

Production (Render): set DATABASE_URL to the Postgres connection string
Render gives you for your managed Postgres instance. SQLite's file lives on
Render's ephemeral disk and can be wiped on redeploy/restart -- that's fine
for local testing but not for real farmer data, so production should always
point at Postgres.
"""
import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    sqlite_path = Path(__file__).parent.parent / "maweshi.db"
    DATABASE_URL = f"sqlite:///{sqlite_path}"

# SQLite needs this flag for use with FastAPI's threaded request handling.
# Postgres (and everything else) ignores it, so it's safe to always pass.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def init_db() -> None:
    """Create tables that don't exist yet. Call once on startup."""
    # Import models here (not at module top) so they're registered on Base
    # before create_all runs, without creating an import cycle with db.py.
    from app import models  # noqa: F401

    Base.metadata.create_all(bind=engine)


def get_db():
    """FastAPI dependency: yields a session, always closes it after the request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
