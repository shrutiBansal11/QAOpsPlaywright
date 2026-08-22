const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');


test('@Web Client App login', async ( {page})=> // .only will only run that test, this is useful while developing tests and unit test are running
{

const email="Bansal.shruti48@gmail.com"
const username = page.getByPlaceholder("email@example.com"); // extract id
const signin  = page.getByRole("button", {name : 'login'}); // extract css based on attribute
const cardTitles = page.locator(".card-body h5");

//login to application and Add Product to Cart
await page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // this open the URL of application
console.log(await page.title());
await username.fill(email);
await page.getByPlaceholder("enter your passsword").fill("7Sugarleastreet@");
await signin.click();
await cardTitles.last().waitFor();
await page.locator(".card-body").filter({hasText: 'iphone 13 pro'}).getByRole("button", {name : 'Add to Cart'}).click();
//await page.pause();


// assertion to check if product added to cart and checkout
await page.getByRole("listitem").getByRole('button', {name : 'Cart'}).click(); // for locating cart button via attribute/value CSS
await page.locator("li div").first().waitFor();
await expect(page.getByText("iPhone 13 Pro")).toBeVisible(); // waiting for the cart page to load completely
await page.getByRole("button", {name : 'Checkout'}).click();
//await page.pause();

//Place order and assertion to check order placed.
await expect(page.locator("label:has-text('Bansal.shruti48@gmail.com')")).toHaveText(email)
//special keyboard handling for drodown
await page.getByPlaceholder("Select Country").pressSequentially('Ind', { delay: 100 })
//await dropdown.waitFor();
//await page.locator(".ta-results").filter({hasText: "India"}).getByRole("option", ("India")).selectOption();

await page.getByRole('button', {name : 'India'}).nth(1).click();
await page.getByText("Place Order").click();
await expect(page.getByText("Thankyou for the Order")).toBeVisible(); 
//await page.pause();




//tobe continued

// const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
// console.log(orderId);



// //await page.locator("button.btn.btn-custom").nth(1).click();
// await page.locator("button[routerlink*=myorders]").click();
// //await page.pause();
// await page.locator("tbody").waitFor();
// const orderrows = await page.locator("tbody tr");
// const rowscount = await orderrows.count()
// for(let i=0; i<rowscount; ++i)
// {

//     const ordercol= await orderrows.nth(i).locator("th").textContent();
//     console.log("YourOrderid is:", ordercol);
//     if(orderId.includes(ordercol))
//     {
//           await orderrows.nth(i).locator("button").first().click();
//          break;
//          await page.pause();


//     }
// }
// const orderiddetails =await page.locator(".col-text").textContent();
// console.log("Your OrderIdDetails are", orderiddetails);
// await expect (orderId.includes(orderiddetails)).toBeTruthy;


});


// wait until last element is loaded OR
// await page.waitForLoadState('networkidle'); //wait  until network is idle
//console.log (await cardTitles.nth(0) .textContent()); //extract  multiple webelement
//const cardName= await cardTitles.allTextContents();
