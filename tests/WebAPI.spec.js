const { test, expect, request } = require('@playwright/test');
const { ok } = require('assert');
const loginPayload = { userEmail: "Bansal.shruti48@gmail.com", userPassword: "7Sugarleastreet@" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let token;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload


        })//200, 201

    await expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;
    console.log(token);

    //Place order as a pre-requisite to verify the order details.

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    await expect(orderResponse.ok()).toBeTruthy();
    const orderResponsejson = await orderResponse.json();
    console.log(orderResponsejson);
    orderId = await orderResponsejson.orders[0];

}
);

test.beforeEach(() => {


});

test('@Web Client App login', async ({ page }) => // .only will only run that test, this is useful while developing tests and unit test are running
{

    // console.log(await page.title());
    // await cardTitles.last().waitFor(); // wait until last element is loaded OR
    // await page.waitForLoadState('networkidle'); //wait  until network is idle
    //console.log (await cardTitles.nth(0) .textContent()); //extract  multiple webelement

    page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*=myorders]").click();
    //await page.pause();
    await page.locator("tbody").waitFor();
    const orderrows = await page.locator("tbody tr");
    const rowscount = await orderrows.count()
    for (let i = 0; i < rowscount; ++i) {

        const ordercol = await orderrows.nth(i).locator("th").textContent();
        console.log("YourOrderid is:", ordercol);
        if (orderId.includes(ordercol)) {
            await orderrows.nth(i).locator("button").first().click();
            break;



        }
    }
    const orderiddetails = await page.locator(".col-text").textContent();
    console.log("Your OrderIdDetails are", orderiddetails);
    await page.pause();
    await expect(orderId.includes(orderiddetails)).toBeTruthy;


});
