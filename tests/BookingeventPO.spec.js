const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./LoginPage');
const { HomePage } = require('./HomePage');
const { CreateEventPage } = require('./CreateEventPage');
const { EventsPage} = require('./EventsPage');
 const {BookEventPage} = require('./BookEventPage');
 const{MyBookingPage} = require('./MyBookingPage');

const { futureDate, futureDateTimeLocal, futureDateObject } = require('./helpers/dateTimeUtils');
const { selectDateFromCalendar } = require('./helpers/calenderPicker');

const username = 'bansal.shruti48@gmail.com';
const password = '7Sugarleastreet@';
const eventTitle = `Test Event ${Date.now()}`;
const eventDate = futureDateTimeLocal(96, 'hour');



test('Booking Event', async ({ page }) => {
//login Page

  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.validLogin(username, password);
  await loginPage.verifyHomePageLoaded();

//home Page
  const homePage = new HomePage(page);
  await homePage.navigatetoManageEventsPage();

//Create Event Page
const createEventPage = new CreateEventPage(page);
await createEventPage.createNewEvent(eventTitle, eventDate);
await createEventPage.navigateToEventsPage();

//Events Page
const eventsPage = new EventsPage(page);
await eventsPage.validateEventDetails(eventTitle);
const seatsBeforeBooking = await eventsPage.getSeatCount(eventTitle);
console.log('Before:', seatsBeforeBooking);
await eventsPage.navigatetoBookEventPage(eventTitle);

//Book Event Page
const bookEventPage = new BookEventPage(page);
await bookEventPage.bookEvent("Shruti Bansal", "bansal.shruti48@gmail.com", "+91 98765 43210");
const bookingref= await bookEventPage.validateBookingRef();
console.log(bookingref);
await bookEventPage.navigateToMyBookingsPage();

const myBookingPage = new MyBookingPage(page, bookingref);
await myBookingPage.validateMyBookingDetails(eventTitle);
await createEventPage.navigateToEventsPage();

await expect.poll(async () => 
     await eventsPage.getSeatCount(eventTitle), 
     { timeout: 10000 }).toBe(seatsBeforeBooking - 1);


const seatsAfterBooking = await eventsPage.getSeatCount(eventTitle);
console.log('After:', seatsAfterBooking);

// Assertion
expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);


});
