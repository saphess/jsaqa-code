const { test, expect } = require("@playwright/test");
const { email, pass } = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', pass);
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.url()).toContain("/profile");
  await expect(page.locator("h2")).toHaveText("Моё обучение");
});

test("Authorization with invalid data", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', "00000@test.test");
  await page.fill('[placeholder="Пароль"]', "123456");
  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText(
    "Вы ввели неправильно логин или пароль."
  );
});
