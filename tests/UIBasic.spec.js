const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');

test.describe.configure({mode: 'serial'});

test('Playwright browser context test', async ({browser, page})=> 
{
    
// put Await keyword to execute code in sync and add Async before function. if await is require, ensure async is present.
//function keyword represent anonymus, it can be replaced with =>

//const context = await browser.newContext(); //this opens a fresh instance without any previous plugins/cookies
//const page = await context.newPage(); // this open a page on fresh instance
await page.goto("https://online.immi.gov.au/lusc/login"); // this open the URL of application
console.log(await page.title());
await page.locator("#username").fill("bansal.shruti48@gmail.com");
await page.locator("#password").fill("Pearlriver@1911");
await page.getByRole('button', { name: 'login' }).click();

await expect(page).toHaveURL('https://online.immi.gov.au/lusc/login');
//console.log(await expect(page.locator("h1.panelHeading")).toHaveText("Authenticate ImmiAccount"));

const text = await page.locator(".panelHeading").textContent();
console.log(text); 

});

test('Playwright page context test', async ( {page})=> // .only will only run that test, this is useful while developing tests and unit test are running
{

await page.goto("https://google.com"); // this open the URL of application
console.log(await page.title());
await expect(page).toHaveTitle("Google");

});

test('Playwright WebUI test', async ( {page})=> // .only will only run that test, this is useful while developing tests and unit test are running
{
const username = page.locator("#username"); // extract id
const signin  = page.locator("[name='signin']"); // extract css based on attribute
const cardTitles = page.locator(".card-body a");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // this open the URL of application
console.log(await page.title());

await username.fill("rahulshettyacademy");
await page.locator("[name='password']").fill("Learning@830$3mK2");
await signin.click();

//console.log (await cardTitles.nth(0) .textContent()); //extract  multiple webelement
const cardName= await cardTitles.allTextContents();
console.log(cardName);


//await expect(page).toHaveTitle("Google");

});

//priority of timeout
//Step level> test level> Global level
test('Playwright UIControl', async ( {page})=> // .only will only run that test, this is useful while developing tests and unit test are running
{
const slowexpect = expect.configure({timeout : 9000}); // timeout assertion on test level
//page.setDefaultTimeout({timeout: 60000}); //timeout test on test level
const username = page.locator("#username"); // extract id
const signin  = page.locator("[name='signin']"); // extract css based on attribute
const dropdown = page.locator("select.form-control"); 
const radiobutton = page.locator(".radiotextsty");
const documentLink = page.locator("[href*='documents-request']");


await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); // this open the URL of application
console.log(await page.title());

await username.fill("rahulshettyacademy");
await page.locator("[name='password']").fill("Learning@830$3mK2");
await dropdown.selectOption("consult"); // fetch dropdown value
await radiobutton.last().click();
await page.locator("#okayBtn").click()
await slowexpect( radiobutton.last()).toBeChecked(); //assertion OR
//console.log(await radiobutton.last().isChecked()); //another assertion
await page.locator("#terms").click();


await slowexpect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
slowexpect(await page.locator("#terms").isChecked()).toBeFalsy();
await slowexpect(documentLink).toHaveAttribute("class", "blinkingText");

//await signin.click();

//page.pause();
});

test('Playwright Childpage test', async ( {browser})=> // test two open pages
{
const context = await browser.newContext();
const page = await context.newPage();
const username = page.locator("#username"); 
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");

const [newPage]= await Promise.all(
    [
        context.waitForEvent('page'), documentLink.click() // points to new page once child page is open.
    ])
//store domain value in variable in child page
    const arraytext = (await newPage.locator(".im-para.red").textContent()).split("@");
    const domain = arraytext[1].split(" ")[0];
    console.log(domain);
    
    // fill stored domain value in username in parent page
    await username.fill(domain);
    console.log(await username.inputValue()); //inputvalue reads on run time and text content read from DOM markup.
   // await page.pause();

});



test('Playwright WebUI test Ecommerce', async ( {page})=> // .only will only run that test, this is useful while developing tests and unit test are running
{
const username = page.locator("#userEmail"); // extract id
const signin  = page.locator("#login"); // extract css based on attribute
const cardTitles = page.locator(".card-body h5");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // this open the URL of application
console.log(await page.title());

await username.fill("Bansal.shruti48@gmail.com");
await page.locator("#userPassword").fill("7Sugarleastreet@");
await signin.click();

await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

//console.log (await cardTitles.nth(0) .textContent()); //extract  multiple webelement
const cardName= await cardTitles.allTextContents();
console.log(cardName);
});



// test('Playwright page context test', async ( {authentication page})=> // .only will only run that test, this is useful while developing tests and unit test are running
// {

// console.log(await page.title());

// await expect(page).toHaveTitle("Google");
// });