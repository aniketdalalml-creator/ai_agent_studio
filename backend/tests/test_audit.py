# Audit logging tests — HIPAA-required create/delete tracking and RBAC.
import pytest
from httpx import AsyncClient

from app.store import memory as store

# HIPAA REQUIRED


@pytest.mark.asyncio
async def test_create_copilot_creates_audit_log(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    response = await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    copilot_id = response.json()["id"]
    logs = store.list_audit_logs("org-001")
    assert len(logs) == 1
    assert logs[0]["user_id"] == "user-001"
    assert logs[0]["action"] == "create_copilot"
    assert logs[0]["resource"] == copilot_id
    assert logs[0]["timestamp"]


@pytest.mark.asyncio
async def test_delete_copilot_creates_audit_log(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    create_response = await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    copilot_id = create_response.json()["id"]
    await client.delete(
        f"/api/copilots/{copilot_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    logs = [log for log in store.list_audit_logs("org-001") if log["action"] == "delete_copilot"]
    assert len(logs) == 1
    assert logs[0]["resource"] == copilot_id


@pytest.mark.asyncio
async def test_audit_log_includes_ip_address(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    logs = store.list_audit_logs("org-001")
    assert logs[0]["ip_address"] is not None


@pytest.mark.asyncio
async def test_member_cannot_read_audit_logs(client: AsyncClient, member_token: str) -> None:
    response = await client.get(
        "/api/audit-logs",
        headers={"Authorization": f"Bearer {member_token}"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_admin_can_read_audit_logs(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    response = await client.get(
        "/api/audit-logs",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 200
