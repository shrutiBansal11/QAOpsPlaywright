const { poManager } = require('../../pages/pageObjects_cucumber/POManager');
const { Before, After, BeforeStep, AfterStep, Status, BeforeAll, AfterAll } = require('@cucumber/cucumber')
const { expect, chromium } = require('@playwright/test');
const path = require('path');

let browser;
let context;
let page;

BeforeAll({ timeout: 100 * 1000 }, async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

});

Before(async function () {

    this.page = page;

});

Before({ tags: "@Validation", timeout: 100 * 1000 }, async function () {
    this.POManagerOBJ = new poManager(this.page);
    this.SignInPage = this.POManagerOBJ.getSignInPage();


});


Before({ tags: "@checkout", timeout: 100 * 1000 }, async function () {


    const email = "Bansal.shruti48@gmail.com"
    const username = this.page.getByPlaceholder("email@example.com"); // extract id
    const signin = this.page.getByRole("button", { name: 'login' }); // extract css based on attribute
    const cardTitles = this.page.locator(".card-body h5");
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // this open the URL of application
    console.log(await this.page.title());
    await username.fill(email);
    await this.page.getByPlaceholder("enter your passsword").fill("7Sugarleastreet@");
    await signin.click();
    await cardTitles.last().waitFor();

});

BeforeStep(function () {

});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.PASSED) {
        console.log("I am executing after each step is passed");
        await this.page.screenshot({ path: 'NewScreenshot.png' });
    }
});


After( async function () {
    await this.page.getByRole("listitem").getByRole('button', {name : 'Sign Out'}).click();

});

AfterAll({timeout: 100 * 1000}, async function () {
    await context.close();
    await browser.close();
});



//before: Run before each scenario
//beforeAll: Runs before all scenario
//beforeStep: Run before each steps of each scenario
//after: Runs after each scenario
//AfterAll: run after all scenarios
//AfterStep: Runs after each step of each scenario