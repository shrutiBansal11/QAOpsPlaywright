const { test, expect } = require('@playwright/test');
const {loginAndGoToEvents} = require('./helpers/loginAndGoToEvents');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// const CREDENTIALS = {
//   username: 'bansal.shruti48@gmail.com',
//   password: '7Sugarleastreet@',
// };

//SIX_EVENTS_RESPONSE — a JSON object with data array of 6 event objects and pagination (total: 6)
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

//FOUR_EVENTS_RESPONSE — same shape but only 4 events in data (total: 4)
const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

//Test1

test("Banner IS visible when 6 events are returned", async({page}) =>
{
//Set up the APIMock and Register the Mock

await page.route('**/api/events**' , async(route) => //- Intercept all requests matching **/api/events** using page.route()
{
await route.fulfill({

    status:200,
    contentType:'application/json',
    body:JSON.stringify(SIX_EVENTS_RESPONSE)
});
});

// Login and navigate
await loginAndGoToEvents(page, 'bansal.shruti48@gmail.com', '7Sugarleastreet@');

// Verify cards loaded from mock
const eventCards = await page.getByTestId("event-card");
await expect(eventCards.first()).toBeVisible();
await expect(eventCards).toHaveCount(6);

//Verify banner is visible
const banner= await page.getByText(/sandbox holds up to/i);
await expect(banner).toBeVisible();
await expect(banner).toContainText("9 bookings");

});

//Test2

test("Banner is NOT visible when 4 events are returned", async({page}) =>
{
//Set up the APIMock and Register the Mock

await page.route('**/api/events**' , async(route) => //- Intercept all requests matching **/api/events** using page.route()
{
await route.fulfill({

    status:200,
    contentType:'application/json',
    body:JSON.stringify(FOUR_EVENTS_RESPONSE)
});
});

// Login and navigate
await loginAndGoToEvents(page, 'bansal.shruti48@gmail.com', '7Sugarleastreet@');

// Verify cards loaded from mock
const eventCards = await page.getByTestId("event-card");
await expect(eventCards.first()).toBeVisible();
await expect(eventCards).toHaveCount(4);

//Verify banner is hidden
const banner= await page.getByText(/Your sandbox holds up to/i);
await expect(banner).not.toBeVisible();

});
