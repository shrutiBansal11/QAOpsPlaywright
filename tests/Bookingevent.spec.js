const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/login');
const { futureDate, futureDateTimeLocal, futureDateObject } = require('./helpers/dateTimeUtils');
const { selectDateFromCalendar } = require('./helpers/calenderPicker');



test('Login test', async ({ page }) => {
  await login(page, 'bansal.shruti48@gmail.com', '7Sugarleastreet@');
  //await expect(page.getByText("Browse Events →", {exact : true})).toBeVisible();

  await page.getByRole("button", { name: "Admin" }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

  const eventTitle = `Test Event ${Date.now()}`;
  const eventDate = futureDateTimeLocal(96, 'hour');
  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea').fill("Hands-on coding workshop designed for absolute beginners. Build a live personal portfolio page.");
  await page.locator("#category").selectOption("Workshop");
  await page.getByLabel('City').fill('Hyderabad');
  await page.getByLabel('Venue').fill("Melbourne Connect, 700 Swanston St, Carlton VIC");
  await page.getByLabel('Event Date & Time').fill(eventDate);
  await page.getByLabel('Price ($)').fill('200');
  await page.locator('#total-seats').fill('50');
  await page.locator('#add-event-btn').click();
  await page.waitForLoadState('networkidle');

  const message = await page.getByText("Event Created").textContent();
  console.log(message);
  await expect(page.getByText("Event Created")).toBeVisible();

  await page.locator('#nav-events').click();
  const alleventcards = await page.locator("#event-card");
  await expect(alleventcards.first()).toBeVisible();
  const cardnames = await alleventcards.allTextContents();
  //console.log(cardnames);
  console.log(await alleventcards.filter({ hasText: eventTitle }).textContent());
  await expect(alleventcards.filter({ hasText: eventTitle })).toBeVisible({ timeout: 5_000 });
  const seats = await alleventcards.filter({ hasText: eventTitle }).getByText("seats").textContent();
  console.log(seats);
  const match = seats.match(/\d+/);   // finds the first sequence of digits
  const seatsBeforeBooking = parseInt(match[0], 10);
  //console.log(seatsBeforeBooking);

  await alleventcards.filter({ hasText: eventTitle }).getByTestId('book-now-btn').click();

  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.locator("#customerName").fill("Shruti Bansal");
  await page.locator("#customer-email").fill("bansal.shruti48@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  const booking = await page.locator(".booking-ref").first();
  //console.log(booking);
  await expect(await booking).toBeVisible();
  const bookingref = await booking.textContent();
  console.log(bookingref);
  await page.getByRole('button', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL('/bookings');

  const bookingcard = await page.locator("#booking-card").first();
  //console.log(mybookingdetails);
  await expect(bookingcard).toBeVisible();

  await page.locator("#booking-card").filter({ hasText: bookingref }).textContent();

  await expect(bookingcard.filter({ hasText: bookingref })).toBeVisible();
  const bookingeventId = await page.locator("#booking-card").first().getByText(eventTitle).textContent();
  console.log(bookingeventId)
  await expect(page.locator("#booking-card").first()).toContainText(eventTitle);


  await page.waitForTimeout(5000);
  await page.locator('#nav-events').click();

  //const neweventcards = await page.locator("#event-card");
  await expect(await page.locator("#event-card").first()).toBeVisible();
  const afterCard = page.locator('[data-testid="event-card"]').filter({ hasText: eventTitle });

  // Wait until the seat count actually changes from the "before" value
  await expect.poll(async () => {
    const text = await afterCard.getByText("seats").textContent();
    const matchafter = text.match(/\d+/);
    return matchafter ? parseInt(matchafter[0], 10) : null;
  }, { timeout: 10000 }).toBe(seatsBeforeBooking - 1);

  // Now safe to read/log the confirmed value
  const seatsAfterText = await afterCard.getByText("seats").textContent();
  const seatsAfterBooking = parseInt(seatsAfterText.match(/\d+/)[0], 10);
  console.log(seatsAfterBooking);

  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
  //await page.pause();
});
//  await page.getByRole('button', { name: 'Admin' }).click();
//   await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
//   await page.getByTestId('event-title-input').click();