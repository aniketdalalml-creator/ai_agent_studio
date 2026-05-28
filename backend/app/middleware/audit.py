# Audit middleware for recording security-relevant API actions.
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


class AuditMiddleware(BaseHTTPMiddleware):
    """Placeholder middleware for writing audit log entries."""

    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ) -> Response:
        """Pass through requests until audit logging is implemented."""
        response = await call_next(request)
        _ = request
        return response
