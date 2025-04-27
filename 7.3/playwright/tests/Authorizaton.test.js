const { test, expect } = require("@playwright/test");
const { email, pass } = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', pass);
  await page.click('[data-testid="login-submit-btn"]');
});
