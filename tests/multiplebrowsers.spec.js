const {test, chromium, firefox, expect}=require('@playwright/test');

test("Validate multiple browsers", async({})=>{

const BrowserChrome = await chromium.launch();
const chromecontext = await BrowserChrome.newContext();
const chromepage = await chromecontext.newPage();


const BrowserChrome2 = await chromium.launch();
const chromecontext2 = await BrowserChrome2.newContext();
const chromepage2 = await chromecontext2.newPage();

// const Browserfirefox= await firefox.launch();
// const firefoxcontext = await Browserfirefox.newContext();
// const firefoxpage = await firefoxcontext.newPage();

await chromepage.goto("https://rahulshettyacademy.com/client/#/auth/login");

await chromepage2.goto("https://rahulshettyacademy.com/loginpagePractise/");
chromepage.close();
//await firefoxpage.goto("https://rahulshettyacademy.com/practice");


console.log(await chromepage2.title());
await expect(chromepage2).toHaveTitle(/.*Rahul/);

const pagepromise= chromecontext2.waitForEvent('page');
await chromepage2.locator("[href*='documents-request']").click();
const newpage = await pagepromise;

console.log(await newpage.title());



});
