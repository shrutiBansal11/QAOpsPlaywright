const { expect } = require("@playwright/test");

async function login(page, username, password) {
  await page.goto('/login');

  await page.getByPlaceholder('you@email.com').fill(username);

  await page.getByPlaceholder('••••••').fill(password);
  await page.locator('#login-btn').click();
  await expect(page.getByText("Browse Events →", {exact : true})).toBeVisible();
}

module.exports = {login};
  