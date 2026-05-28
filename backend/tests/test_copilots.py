# Copilot endpoint tests — RBAC, tenant isolation, and response safety.
import pytest
from httpx import AsyncClient

# HIPAA REQUIRED


@pytest.mark.asyncio
async def test_admin_can_create_copilot(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    response = await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 201
    body = response.json()
    assert body["id"]
    assert body["name"] == copilot_payload["name"]
    assert body["status"] == "draft"


@pytest.mark.asyncio
async def test_member_can_create_copilot(
    client: AsyncClient,
    member_token: str,
    copilot_payload: dict[str, object],
) -> None:
    response = await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {member_token}"},
    )
    assert response.status_code == 201


@pytest.mark.asyncio
async def test_admin_can_delete_copilot(
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
    response = await client.delete(
        f"/api/copilots/{copilot_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 204


@pytest.mark.asyncio
async def test_member_cannot_delete_copilot(
    client: AsyncClient,
    admin_token: str,
    member_token: str,
    copilot_payload: dict[str, object],
) -> None:
    create_response = await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    copilot_id = create_response.json()["id"]
    response = await client.delete(
        f"/api/copilots/{copilot_id}",
        headers={"Authorization": f"Bearer {member_token}"},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_cannot_access_other_org_copilot(
    client: AsyncClient,
    admin_token: str,
    org002_admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    create_response = await client.post(
        "/api/copilots",
        json=copilot_payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    copilot_id = create_response.json()["id"]
    response = await client.get(
        f"/api/copilots/{copilot_id}",
        headers={"Authorization": f"Bearer {org002_admin_token}"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_api_key_not_returned_in_response(
    client: AsyncClient,
    admin_token: str,
    copilot_payload: dict[str, object],
) -> None:
    payload = {**copilot_payload, "api_key": "secret-key-value"}
    create_response = await client.post(
        "/api/copilots",
        json=payload,
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    copilot_id = create_response.json()["id"]
    get_response = await client.get(
        f"/api/copilots/{copilot_id}",
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert "api_key" not in get_response.json()


@pytest.mark.asyncio
async def test_invalid_input_returns_422(client: AsyncClient, admin_token: str) -> None:
    response = await client.post(
        "/api/copilots",
        json={"description": "missing required fields"},
        headers={"Authorization": f"Bearer {admin_token}"},
    )
    assert response.status_code == 422
