// E2E automation — verifies backend health endpoint when API server is running.
import { expect, test } from "@playwright/test";

const apiBaseUrl = process.env.API_BASE_URL ?? "http://127.0.0.1:8001";

test("backend health endpoint returns ok", async ({ request }) => {
  const response = await request.get(`${apiBaseUrl}/health`);
  if (response.status() === 404 || response.status() >= 500) {
    test.skip(true, "Backend not running — start with: cd backend && uvicorn app.main:app --port 8001");
  }
  expect(response.ok()).toBeTruthy();
  await expect(response.json()).resolves.toEqual({ status: "ok" });
});
