from typing import Generator
from sqlmodel import SQLModel, create_engine, Session
from app.config import settings

# Active connect_args check_same_thread=False uniquement pour SQLite
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
    connect_args=connect_args
)

def init_db(engine_override=None):
    target_engine = engine_override if engine_override is not None else engine
    SQLModel.metadata.create_all(target_engine)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
