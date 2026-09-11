const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('./LoginPage');
// const { HomePage } = require('./HomePage');
// const { CreateEventPage } = require('./CreateEventPage');
// const { EventsPage} = require('./EventsPage');
//  const {BookEventPage} = require('./BookEventPage');
//  const{MyBookingPage} = require('./MyBookingPage');
const { POManager } = require('./POManager');
const { futureDate, futureDateTimeLocal, futureDateObject } = require('./helpers/dateTimeUtils');
const { selectDateFromCalendar } = require('./helpers/calenderPicker');
// convert JSON file to sting then JS object.
const dataset = JSON.parse(JSON.stringify(require('../utils/BookingeventPOdataset.json')));
const eventTitle = `Test Event ${Date.now()}`;
const eventDate = futureDateTimeLocal(96, 'hour');


for (const data of dataset) {
test(`Booking Event ${data.username}`, async ({ page }) => {
//login Page
const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.gotoLoginPage();
  await loginPage.validLogin(data.username, data.password);
  await loginPage.verifyHomePageLoaded();

//home Page
  const homePage = poManager.getHomePage();
  await homePage.navigatetoManageEventsPage();

//Create Event Page
const createEventPage = poManager.getCreateEventPage();
await createEventPage.createNewEvent(eventTitle, eventDate);
await createEventPage.navigateToEventsPage();

//Events Page
const eventsPage = poManager.getEventsPage();
await eventsPage.validateEventDetails(eventTitle);
const seatsBeforeBooking = await eventsPage.getSeatCount(eventTitle);
console.log('Before:', seatsBeforeBooking);
await eventsPage.navigatetoBookEventPage(eventTitle);

//Book Event Page
const bookEventPage = poManager.getBookEventPage();
await bookEventPage.bookEvent("Shruti Bansal", "bansal.shruti48@gmail.com", "+91 98765 43210");
const bookingref= await bookEventPage.validateBookingRef();
console.log(bookingref);
await bookEventPage.navigateToMyBookingsPage();

const myBookingPage = poManager.getMyBookingPage();
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
}