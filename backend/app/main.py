# FastAPI application entrypoint with middleware, monitoring, routers, and health endpoints.
import logging

import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.middleware.auth import AuthMiddleware
from app.routers import audit, auth, chat, copilots, knowledge

settings = get_settings()

if settings.SENTRY_DSN:
    sentry_sdk.init(
        dsn=settings.SENTRY_DSN,
        environment=settings.ENVIRONMENT,
        traces_sample_rate=1.0 if settings.ENVIRONMENT != "production" else 0.2,
    )

app = FastAPI(title="Copilot Studio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AuthMiddleware)

app.include_router(auth.router, prefix="/api")
app.include_router(copilots.router, prefix="/api")
app.include_router(knowledge.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(audit.router, prefix="/api")


@app.get("/health")
def health_check() -> dict[str, str]:
    """Return service liveness state."""
    return {"status": "ok"}


@app.on_event("startup")
async def startup_event() -> None:
    """Emit startup log for observability."""
    logging.getLogger(__name__).info("Copilot Studio API started")
