// E2E tests for login redirects and authentication error handling.
import { expect, test } from "@playwright/test";

test("unauthenticated user is redirected to login", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem("copilot_studio_token");
  });
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

test("valid login redirects to dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@medtech.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
});

test("invalid login shows error message", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("wrong@medtech.com");
  await page.getByLabel("Password").fill("wrong");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
});
