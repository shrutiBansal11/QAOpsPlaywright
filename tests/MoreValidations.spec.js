const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test('Playwright Special locators', async ({ browser, page }) => {
  //getByLabel locator
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");

  //getbyPlaceholder locator
  await page.getByPlaceholder("Password").fill("abc123");

  //getbyRole locator
  //await page.getByRole("button", {name: 'Submit'}).click();
  //await expect(submitbutton).toBeTruthy();
  const locator = await page.getByRole('button', { name: 'Submit' });
  await locator.hover();
  await locator.click();
  //getbyText locator
  const visible = await page.getByText("Success! The Form has been submitted successfully!.");
  //5 seconds default timeout for expect assertions on Step level
  //console.log(visible);
  await expect(visible).toBeVisible({ timeout: 10_000 }); // 10 seconds timeout on Step level
  await page.getByRole("link", { name: "Shop" }).click();
  await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
  //await page.pause();

}
);

test.only('Screenshot and Visual testing', async ({ browser, page }) => {

  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");


  const locator = await page.getByRole('button', { name: 'Submit' });

  await page.screenshot({ path: 'screenshot1.png', fullPage: true });
  expect(await page.screenshot()).toMatchSnapshot('screenshot1.png');
  await locator.hover();
  await locator.click();
});