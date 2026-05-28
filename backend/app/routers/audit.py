# Audit log router for HIPAA-required access tracking.
from fastapi import APIRouter, HTTPException, Request

from app.store import memory as store

router = APIRouter(prefix="/audit-logs", tags=["audit"])


@router.get("")
def list_audit_logs(request: Request) -> list[dict[str, object]]:
    """Return audit logs for admins in the authenticated organization."""
    user = request.state.user
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    return store.list_audit_logs(user["org_id"])
