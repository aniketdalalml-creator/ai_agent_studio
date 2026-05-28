# Shared fixtures for all tests.
import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app
from app.store import memory as store


@pytest.fixture(autouse=True)
def reset_memory_store() -> None:
    store.reset_store()
    yield
    store.reset_store()


@pytest.fixture
def anyio_backend() -> str:
    return "asyncio"


@pytest.fixture
async def client() -> AsyncClient:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as test_client:
        yield test_client


@pytest.fixture
def admin_token() -> str:
    return "test-admin-token-org001-admin"


@pytest.fixture
def member_token() -> str:
    return "test-member-token-org001-member"


@pytest.fixture
def org002_admin_token() -> str:
    return "test-admin-token-org002-admin"


@pytest.fixture
def mock_db() -> None:
    return None


@pytest.fixture
def mock_admin_user() -> dict[str, str]:
    return {
        "id": "user-001",
        "org_id": "org-001",
        "email": "admin@medtech.com",
        "role": "admin",
    }


@pytest.fixture
def mock_member_user() -> dict[str, str]:
    return {
        "id": "user-002",
        "org_id": "org-001",
        "email": "member@medtech.com",
        "role": "member",
    }


@pytest.fixture
def copilot_payload() -> dict[str, object]:
    return {
        "name": "Support Bot",
        "description": "Handles customer support queries",
        "persona": "You are helpful.",
        "model_provider": "anthropic",
        "model_name": "claude-sonnet-4-6",
        "temperature": 0.7,
        "tools": {"web_search": True, "db_query": False, "memory": True},
    }
