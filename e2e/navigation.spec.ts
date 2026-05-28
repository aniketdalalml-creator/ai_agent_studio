// E2E automation — navigates across all MVP screens after authentication.
import { expect, test } from "@playwright/test";

import { mockCopilotApi } from "./helpers/api";
import { loginAsAdmin, seedAuthenticatedSession } from "./helpers/auth";

test.describe("MVP navigation", () => {
  test.beforeEach(async ({ page }) => {
    await seedAuthenticatedSession(page);
    await mockCopilotApi(page);
  });

  test("authenticated user can open dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();
  });

  test("authenticated user can open builder page", async ({ page }) => {
    await page.goto("/builder");
    await expect(page.getByRole("heading", { name: "Copilot Builder" })).toBeVisible();
  });

  test("authenticated user can open knowledge base page", async ({ page }) => {
    await page.goto("/knowledge-base");
    await expect(page.getByText("Knowledge Base")).toBeVisible();
  });

  test("authenticated user can open playground page", async ({ page }) => {
    await page.goto("/playground");
    await expect(page.getByText("Test Chat Playground")).toBeVisible();
  });

  test("login flow reaches dashboard from login form", async ({ page }) => {
    await page.evaluate(() => window.localStorage.clear());
    await loginAsAdmin(page);
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();
  });
});
