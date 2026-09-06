const { test, expect, request } = require('@playwright/test');
const { login } = require('./helpers/login');


const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://eventhub.rahulshettyacademy.com/api';

const yLoginPayload = { email: "test7@ymail.com", password: "Assignment4@" };
const gLoginPayload = { email: "test8@gmail.com", password: "Assignment4!" };
//const bookingPayload = { customerName: "test878", customerEmail: "test7@ymail.com", customerPhone: "+918987128680", "…"};

test('Cross-User Booking Access Denied', async ({ request, page, context }) => {

  //Step 1 — Login as Yahoo user via API  -
  const yLoginResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
    data: yLoginPayload
  });

  await expect(yLoginResponse.status()).toBe(200);
  const yLoginResponseJson = await yLoginResponse.json();
  const yToken = await yLoginResponseJson.token;

  //Step 2 — Fetch events via API to get a valid event ID

  const eventIDResponse = await request.get('https://api.eventhub.rahulshettyacademy.com/api/events', {
    headers: {
      'Authorization': `Bearer ${yToken}`
    }
  });

  await expect(eventIDResponse.status()).toBe(200);
  const eventIDJson = await eventIDResponse.json();
  //console.log(eventIDJson);
  const eventId = await eventIDJson.data[0].id;

  //Step 3 — Create a booking via API as Yahoo user

  const bookingResponse = await request.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
    data:
    {
      "eventId": 2,
      "customerName": "TestBooking8",
      "customerEmail": "test7@ymail.com",
      "customerPhone": "+91-9876549970",
      "quantity": 1
    },
    headers: {
      'Authorization': `Bearer ${yToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    }
  });

  await expect(bookingResponse.status()).toBe(201);
  const bookingResponseJson = await bookingResponse.json();
  //console.log(bookingResponseJson);
  const yahooBookingId = await bookingResponseJson.data.id;
console.log("Yahoo Booking ID:", yahooBookingId);
//await page.pause();


  //Step 4 —Login as Gmail user via browser UI
  await login(page, 'test8@gmail.com', 'Assignment4!'); //Login as Gmail user via browser UI

  //Step 5 — Navigate to Yahoo's booking URL as Gmail user

  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);

  //Step 6 — Validate Access Denied
  const accessDeniedMessage = await page.getByText("Access Denied", { exact: true });
  await expect(accessDeniedMessage).toBeVisible();

  const notAuthorizedMessage = await page.getByText("You are not authorized to view this booking.");
  await expect(notAuthorizedMessage).toBeVisible();

});

// const CREDENTIALS = {
//   username: 'test7@ymail.com', 'test8@gmail.com',
//   password: 'Assignment4@', 'Assignment4!'
// };

