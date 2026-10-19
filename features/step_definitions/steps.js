const { Given, Then, When } = require('@cucumber/cucumber');
const { poManager } = require('../../pages/pageObjects_cucumber/poManager');
const { expect, chromium } = require('@playwright/test');

Given('I am on the login page', { timeout: 100 * 1000 }, async function () {

    await this.SignInPage.gotoSigninPage();

});

When('I enter username {string} and password {string}', async function (username, password) {

    await this.SignInPage.validSignin("Bansal.shruti48@gmail.com", "7Sugarleastreet@");

});

When('I click the login button', async function () {
    await this.SignInPage.clickLoginBtn();
});

Then('I should be redirected to the home page', { timeout: 100 * 1000 }, async function () {
    await this.SignInPage.validateHomePage();
});

Then('I should see a welcome message', { timeout: 100 * 1000 }, async function () {
    await this.SignInPage.validateHomePage();
});


Given('the user has added {string} to the cart', { timeout: 100 * 1000 },  async function (Product) {
await this.page.locator(".card-body").filter({hasText: Product}).getByRole("button", {name : 'Add to Cart'}).click();
await this.page.getByRole("listitem").getByRole('button', {name : 'Cart'}).click();
});

When('the user clicks Checkout for {string}', async function (Product) {
   // for locating cart button via attribute/value CSS
await this.page.locator("li div").first().waitFor();
await expect(this.page.getByText(Product)).toBeVisible(); // waiting for the cart page to load completely
await this.page.getByRole("button", {name : 'Checkout'}).click();
});

When('enter all the details',async function () {
await expect(this.page.locator("label:has-text('Bansal.shruti48@gmail.com')")).toBeVisible();
await this.page.getByPlaceholder("Select Country").pressSequentially('Ind', { delay: 100 })
await this.page.getByRole('button', {name : 'India'}).nth(1).click();
});

When('clicks Place Order', { timeout: 100 * 1000 }, async function () {
  await this.page.getByText("Place Order").click();
});

Then('the confirmation message {string} is displayed', async function (Message) {
  await expect(this.page.getByText(Message)).toBeVisible();
});







