# Copilot management router for CRUD endpoints.
from fastapi import APIRouter, HTTPException, Request

from app.schemas.copilot import CopilotCreate
from app.store import memory as store

router = APIRouter(prefix="/copilots", tags=["copilots"])


def _client_ip(request: Request) -> str | None:
    return request.client.host if request.client else None


@router.get("")
def list_copilots(request: Request) -> list[dict[str, object]]:
    """Return copilots for the authenticated user's organization."""
    user = request.state.user
    return store.list_copilots(user["org_id"])


@router.post("", status_code=201)
def create_copilot(payload: CopilotCreate, request: Request) -> dict[str, object]:
    """Create a copilot in draft status for the user's organization."""
    user = request.state.user
    body = payload.model_dump()
    if payload.api_key is not None:
        body["api_key"] = payload.api_key
    return store.create_copilot(body, user, _client_ip(request))


@router.get("/{copilot_id}")
def get_copilot(copilot_id: str, request: Request) -> dict[str, object]:
    """Return a single copilot if it belongs to the user's organization."""
    user = request.state.user
    copilot = store.get_copilot(copilot_id, user["org_id"])
    if copilot is None:
        raise HTTPException(status_code=404, detail="Copilot not found")
    return copilot


@router.delete("/{copilot_id}", status_code=204)
def delete_copilot(copilot_id: str, request: Request) -> None:
    """Delete a copilot — admin only."""
    user = request.state.user
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    deleted = store.delete_copilot(copilot_id, user["org_id"], user["id"], _client_ip(request))
    if not deleted:
        raise HTTPException(status_code=404, detail="Copilot not found")
