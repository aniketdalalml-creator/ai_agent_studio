# Test-oriented token parsing for auth middleware and RBAC checks.
from typing import TypedDict


class AuthUser(TypedDict):
    id: str
    org_id: str
    email: str
    role: str


def parse_bearer_token(token: str) -> AuthUser | None:
    """Parse deterministic test tokens used in unit tests."""
    if not token or token == "invalid" or token.startswith("garbage"):
        return None
    if token == "expired-token" or token.startswith("expired"):
        return None

    mapping: dict[str, AuthUser] = {
        "test-admin-token-org001-admin": {
            "id": "user-001",
            "org_id": "org-001",
            "email": "admin@medtech.com",
            "role": "admin",
        },
        "test-member-token-org001-member": {
            "id": "user-002",
            "org_id": "org-001",
            "email": "member@medtech.com",
            "role": "member",
        },
        "test-admin-token-org002-admin": {
            "id": "user-003",
            "org_id": "org-002",
            "email": "admin@edtech.com",
            "role": "admin",
        },
    }
    return mapping.get(token)
