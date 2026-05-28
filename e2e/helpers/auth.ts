// Playwright auth helpers for reusable login and API mocking in E2E tests.
import type { Page } from "@playwright/test";

export const ADMIN_EMAIL = "admin@medtech.com";
export const ADMIN_PASSWORD = "password123";
export const ADMIN_TOKEN = "test-admin-token-org001-admin";

export async function seedAuthenticatedSession(page: Page): Promise<void> {
  await page.addInitScript((token) => {
    window.localStorage.setItem("copilot_studio_token", token);
  }, ADMIN_TOKEN);
}

export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto("/login");
  await page.getByLabel("Email").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL(/\/dashboard$/);
}
