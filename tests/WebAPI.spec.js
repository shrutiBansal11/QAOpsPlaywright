const { test, expect, request } = require('@playwright/test');
const { ok } = require('assert');
const loginPayload = { userEmail: "Bansal.shruti48@gmail.com", userPassword: "7Sugarleastreet@" };
let token;
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

    page.addInitScript(value =>{

        window.localStorage.setItem('token', value);

    }, token);

 const email = "Bansal.shruti48@gmail.com"
    const username = page.locator("#userEmail"); // extract id
    const signin = page.locator("#login"); // extract css based on attribute
    const productName = "iphone 13 pro";
    const products = page.locator(".card-body");


    await page.goto("https://rahulshettyacademy.com/client/");
    const cardTitles = page.locator(".card-body h5");
    const cardName = await cardTitles.allTextContents();
    //console.log(cardName);

    //Add a product in a cart, Product name Iphone 13 Pro
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() == productName) {
            const iphone = await products.nth(i).locator("b").textContent();
            await products.nth(i).locator("text=  Add To Cart").click();
            console.log(iphone);
            break;
        }
    }

    // assertion to check if product added to cart
    await page.locator("[routerlink*='cart']").click(); // for locating cart button via attribute/value CSS
    await page.locator("li div").first().waitFor(); // waiting for the cart page to load completely
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible(); //for locating the added product via text CSS
    await expect(bool).toBeTruthy(); // assertion to check if it returns true OR

    //await expect(page.locator("h3:has-text('iPhone 13 Pro')")).toBeVisible();


    await page.locator("text=Checkout").click();
    //await page.pause();
    const creditcardno = "2033232134320099"
    const selectedcountry = " India"

    //const cardinfo = await page.locator("form.ng-untouched.ng-pristine.ng-valid");

    //await page.cardinfo.locator("input.txt.text-validated").fill("");
    //await page.cardinfo.locator(".input.txt.text-validated").fill(creditcardno);


    await page.locator("input.txt.text-validated").first().fill("");
    await page.locator(".input.txt.text-validated").first().fill(creditcardno);
    await page.locator("select.input.ddl").first().selectOption("05");
    await page.locator("select.input.ddl").last().selectOption("30");
    await page.locator("input.input.txt").nth(1).fill("111");
    await page.locator("input.input.txt").nth(2).fill("Rahul Shetty");
    //await page.locator("[name*='coupon']").fill("RahulShetty22");
    //await page.locator("[type*='submit']").click();

    await expect(page.locator("label:has-text('Bansal.shruti48@gmail.com')")).toHaveText(email)

    //special keyboard handling for drodown
    await page.locator("[placeholder*='Select Country']").pressSequentially('Ind', { delay: 100 })
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();

    const optionscount = await dropdown.locator("button").count();
    for (let i = 0; i < optionscount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text);
        if (text === selectedcountry) {
            await dropdown.locator("button").nth(i).click();

            break;

        }
    }
    await page.locator("text=Place Order ").click();

    //const thankyoutext= await page.locator("h1:has-text(' Thankyou for the order. ')").textContent();
    //console.log(thankyoutext);

    await expect(page.locator("h1:has-text(' Thankyou for the order. ')")).toBeVisible();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);



    //await page.locator("button.btn.btn-custom").nth(1).click();
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
            // await page.pause();


        }
    }
    const orderiddetails = await page.locator(".col-text").textContent();
    console.log("Your OrderIdDetails are", orderiddetails);
    await expect(orderId.includes(orderiddetails)).toBeTruthy;


});
