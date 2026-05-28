// E2E tests for dashboard copilot listing and navigation flows.
import { expect, test } from "@playwright/test";

import { mockCopilotApi } from "./helpers/api";
import { seedAuthenticatedSession } from "./helpers/auth";

test.beforeEach(async ({ page }) => {
  await seedAuthenticatedSession(page);
  await mockCopilotApi(page);
});

test("dashboard shows copilot cards", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByText("Support Bot")).toBeVisible();
  await expect(page.getByText("ACTIVE")).toBeVisible();
});

test("new copilot button opens creation modal", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "New Copilot" }).click();
  await expect(page.getByRole("heading", { name: "Create Copilot" })).toBeVisible();
  await expect(page.getByLabel("Copilot name")).toBeVisible();
});

test("open builder navigates to builder page", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "Open Builder" }).first().click();
  await expect(page).toHaveURL(/\/builder/);
  await expect(page.getByRole("heading", { name: "Support Bot" })).toBeVisible();
});
