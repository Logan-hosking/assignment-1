const { test, expect } = require("@playwright/test");

test("teacher can create, edit and delete a word", async ({ page }) => {
  await page.goto("/manage");

  await page.getByLabel("English word").fill("playwright");

  await page
    .getByLabel("Hint")
    .fill("Test word created by Playwright");

  await page
    .getByLabel("Phonemes")
    .fill("p, l, eɪ, w, r, aɪ, t");

  await page
    .getByRole("button", { name: "Add Word" })
    .click();

  await expect(
    page.getByText("Word created successfully.")
  ).toBeVisible();

  await expect(
    page.getByText("playwright", { exact: true })
  ).toBeVisible();

  const wordCard = page
    .locator(".card")
    .filter({ hasText: "playwright" });

  await wordCard
    .getByRole("button", { name: "Edit" })
    .click();

  await page
    .getByLabel("Hint")
    .fill("Updated by Playwright");

  await page
    .getByRole("button", { name: "Update Word" })
    .click();

  await expect(
    page.getByText("Word updated successfully.")
  ).toBeVisible();

  const updatedCard = page
    .locator(".card")
    .filter({ hasText: "playwright" });

  // Prepare Playwright to accept the confirmation
  // dialog before clicking Delete.
  page.once("dialog", async (dialog) => {
    await dialog.accept();
  });

  await updatedCard
    .getByRole("button", { name: "Delete" })
    .click();

  await expect(
    page.getByText("Word deleted successfully.")
  ).toBeVisible();
});