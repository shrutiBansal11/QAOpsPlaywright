const { test, expect, request } = require('@playwright/test');
const {APIUtils}= require('./helpers/APIUtils');
//const { ok } = require('assert');
const loginPayload = { userEmail: "Bansal.shruti48@gmail.com", userPassword: "7Sugarleastreet@" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;

test.beforeAll(async () => {
   const apiContext = await request.newContext();
const apiUtils= new APIUtils(apiContext, loginPayload);
response = await apiUtils.createOrder(orderPayload);
}
);


test('@Web Client App login', async ({ page }) => // .only will only run that test, this is useful while developing tests and unit test are running
{

 
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*=myorders]").click();
    //await page.pause();
    await page.locator("tbody").waitFor();
    const orderrows = await page.locator("tbody tr");
    const rowscount = await orderrows.count()
    for (let i = 0; i < rowscount; ++i) {

        const ordercol = await orderrows.nth(i).locator("th").textContent();
        console.log("YourOrderid is:", ordercol);
        if (response.orderId.includes(ordercol)) {
            await orderrows.nth(i).locator("button").first().click();
            break;



        }
    }
    const orderiddetails = await page.locator(".col-text").textContent();
    console.log("Your OrderIdDetails are", orderiddetails);
    await page.pause();
    await expect(response.orderId.includes(orderiddetails)).toBeTruthy;


});
