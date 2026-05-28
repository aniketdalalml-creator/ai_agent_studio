# In-memory data store for copilots and audit logs used in tests and local dev.
from __future__ import annotations

from datetime import UTC, datetime
from typing import Any
from uuid import uuid4

_copilots: dict[str, dict[str, Any]] = {}
_audit_logs: list[dict[str, Any]] = []


def reset_store() -> None:
    """Clear all in-memory records — used between tests."""
    _copilots.clear()
    _audit_logs.clear()


def list_copilots(org_id: str) -> list[dict[str, Any]]:
    return [serialize_copilot(c) for c in _copilots.values() if c["org_id"] == org_id]


def get_copilot(copilot_id: str, org_id: str) -> dict[str, Any] | None:
    copilot = _copilots.get(copilot_id)
    if copilot is None or copilot["org_id"] != org_id:
        return None
    return serialize_copilot(copilot)


def create_copilot(payload: dict[str, Any], user: dict[str, str], ip_address: str | None) -> dict[str, Any]:
    copilot_id = str(uuid4())
    now = datetime.now(UTC).isoformat()
    record = {
        "id": copilot_id,
        "org_id": user["org_id"],
        "name": payload["name"],
        "description": payload.get("description", ""),
        "persona": payload.get("persona", ""),
        "model_provider": payload["model_provider"],
        "model_name": payload["model_name"],
        "temperature": payload.get("temperature", 0.7),
        "status": "draft",
        "tools": payload.get(
            "tools",
            {"web_search": False, "db_query": False, "memory": False},
        ),
        "created_at": now,
        "updated_at": now,
        "conversation_count": 0,
        "last_edited": now,
        "api_key": payload.get("api_key"),
    }
    _copilots[copilot_id] = record
    add_audit_log(
        org_id=user["org_id"],
        user_id=user["id"],
        action="create_copilot",
        resource=copilot_id,
        ip_address=ip_address,
    )
    return serialize_copilot(record)


def delete_copilot(copilot_id: str, org_id: str, user_id: str, ip_address: str | None) -> bool:
    copilot = _copilots.get(copilot_id)
    if copilot is None or copilot["org_id"] != org_id:
        return False
    del _copilots[copilot_id]
    add_audit_log(
        org_id=org_id,
        user_id=user_id,
        action="delete_copilot",
        resource=copilot_id,
        ip_address=ip_address,
    )
    return True


def serialize_copilot(copilot: dict[str, Any]) -> dict[str, Any]:
    data = {key: value for key, value in copilot.items() if key != "api_key"}
    return data


def add_audit_log(
    org_id: str,
    user_id: str,
    action: str,
    resource: str,
    ip_address: str | None,
) -> dict[str, Any]:
    entry = {
        "id": str(uuid4()),
        "org_id": org_id,
        "user_id": user_id,
        "action": action,
        "resource": resource,
        "ip_address": ip_address or "127.0.0.1",
        "timestamp": datetime.now(UTC).isoformat(),
    }
    _audit_logs.append(entry)
    return entry


def list_audit_logs(org_id: str) -> list[dict[str, Any]]:
    return [log for log in _audit_logs if log["org_id"] == org_id]
