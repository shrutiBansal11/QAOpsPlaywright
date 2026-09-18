const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');
//test.describe.configure({ mode: 'parallel' });

test(' Popup validations', { tag: ['@SlowTest', '@Smoke'], }, async ({browser, page}) =>
{
  
test.setTimeout(120_000);
await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); // this open the URL of application
//await page.goto("https://google.com");
//await page.goBack(); // methods to move back and forth in browsers and hit URLs 
//await page.goForward();

 await expect(page.locator("#displayed-text")).toBeVisible();
 await page.locator('#hide-textbox').click();
 await expect(page.locator("#displayed-text")).toBeHidden();
 //to handle dialog 
 await page.pause();
 page.on('dialog',dialog => dialog.accept()); // to accept the alert
 //page.on('dialog',dialog => dialog.dismiss()); // to cancel the alert
 await page.locator('#alertbtn').click();
 await page.locator('#mousehover').hover();
 await page.locator('[href*="#top"]').click();

});

test.only('Alert popup validaton',async({page}) =>
  {
await page.goto("https://testautomationpractice.blogspot.com/");
page.on('dialog', dialog => dialog.accept());
await page.locator("#alertBtn").click();

const table = await page.locator("[name*='BookTable']");
const Subjectvalue= await table.locator("tr").nth(4).locator("td").nth(2).textContent();
console.log(Subjectvalue);

});

test('iframe test validation',async({page})=> {
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
const framespage = page.frameLocator("#courses-iframe");
//to locate a visible locator
await framespage.locator("li a [href]:visible").click();
});

test('@Smoke Playwright Special locators', async ({ browser, page }) => {
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

test('@Smoke Screenshot and Visual testing', async ({ browser, page }) => {

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

