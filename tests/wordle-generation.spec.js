const { test, expect } = require("@playwright/test");

test("user can generate a Wordle activity", async ({ page }) => {
  await page.goto("/wordle");

  await expect(
    page.getByRole("heading", { name: "Wordle Builder" })
  ).toBeVisible();

  const selects = page.locator("select");
  const wordSelect = selects.nth(0);

  await expect(wordSelect).toBeVisible();

  const options = await wordSelect.locator("option").count();

  expect(options).toBeGreaterThan(0);

  await wordSelect.selectOption({ index: 0 });

  const difficultySelect = page.getByLabel("Select difficulty");

  await difficultySelect.selectOption("Medium");

  await expect(
    difficultySelect
  ).toHaveValue("Medium");

  const downloadPromise = page.waitForEvent("download");

  await page
    .getByRole("button", { name: "Generate HTML" })
    .click();

  const download = await downloadPromise;

  expect(
    download.suggestedFilename()
  ).toContain(".html");

  await expect(
    page.locator("strong").filter({ hasText: "Medium" }).first()
  ).toBeVisible();
});