"""
Database setup for Mera Maweshi.

Local dev: no DATABASE_URL set -> falls back to a SQLite file
(backend/maweshi.db). Nothing to install or configure, just works.

Production (Render): set DATABASE_URL to the Postgres connection string
from your database provider (e.g. Neon). SQLite's file lives on Render's
ephemeral disk and can be wiped on redeploy/restart -- that's fine for
local testing but not for real farmer data.

Render automatically sets a RENDER=true env var on every service it runs.
We use that as a tripwire: if we're running on Render and DATABASE_URL is
missing, refuse to start on SQLite at all. This is deliberate -- silently
falling back once already caused every farmer record to quietly vanish
after a redeploy, with no error until users reported it days later. Better
to crash loudly at startup than lose data silently in production.
"""
import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL")
IS_RENDER = os.getenv("RENDER") is not None

if not DATABASE_URL:
    if IS_RENDER:
        raise RuntimeError(
            "DATABASE_URL is not set. Refusing to fall back to SQLite on "
            "Render -- that would silently wipe farmer data on the next "
            "redeploy/restart. Set DATABASE_URL in the Environment tab of "
            "this service to your Postgres connection string."
        )
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
