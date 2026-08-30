const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/login');
//const { futureDate, futureDateTimeLocal, futureDateObject } = require('./helpers/dateTimeUtils');
//const { selectDateFromCalendar } = require('./helpers/calenderPicker');



test('Group ticket booking NOT eligible for refund', async ({ page }) => {
  await login(page, 'bansal.shruti48@gmail.com', '7Sugarleastreet@');


  await page.locator('#nav-events').click();
  await page.locator("#event-card").nth(3).getByTestId('book-now-btn').click();


  page.getByRole("button", { name: '+' }).click();
  page.getByRole("button", { name: '+' }).click();
  await page.locator("#customerName").fill("Shruti Bansal");
  await page.locator("#customer-email").fill("bansal.shruti48@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
  await page.getByRole('button', { name: 'Confirm Booking' }).click();


  await page.getByRole('button', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL('/bookings');

  await page.locator("#booking-card").first().getByRole('button', { name: 'View Details' }).click();
  await expect(page.locator("div.bg-white").last().getByText("Booking Information")).toBeVisible();
  const bookingRef = await page.locator("[class*='font-mono font-bold']").textContent();
  const eventname = await page.locator("h1.text-2xl.font-bold.text-gray-900").textContent();
  expect(bookingRef.trim()[0]).toBe(eventname.trim()[0]);

  //await page.locator("#check-refund-btn").click();
  await page.getByTestId('check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });
  const refund = await page.locator("div.bg-white").nth(3).getByTestId('refund-result');
  //console.log(refund);
  await expect(refund).toBeVisible();
  await expect(refund).toContainText("Not eligible for refund");
  await expect(refund).toContainText("Group bookings (3 tickets) are non-refundable");
  //await page.pause();
});


test('Single ticket booking eligible for refund', async ({ page }) => {
  await login(page, 'bansal.shruti48@gmail.com', '7Sugarleastreet@');


  await page.locator('#nav-events').click();
  await page.locator("#event-card").first().getByTestId('book-now-btn').click();


  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.locator("#customerName").fill("Shruti Bansal");
  await page.locator("#customer-email").fill("bansal.shruti48@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
  await page.getByRole('button', { name: 'Confirm Booking' }).click();


  await page.getByRole('button', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL('/bookings');

  await page.locator("#booking-card").first().getByRole('button', { name: 'View Details' }).click();
  await expect(page.locator("div.bg-white").last().getByText("Booking Information")).toBeVisible();
  const bookingRef = await page.locator("[class*='font-mono font-bold']").textContent();
  const eventname = await page.locator("h1.text-2xl.font-bold.text-gray-900").textContent();
  expect(bookingRef.trim()[0]).toBe(eventname.trim()[0]);

  //await page.locator("#check-refund-btn").click();
  await page.getByTestId('check-refund-btn').click();
  await expect(page.locator('#refund-spinner')).toBeVisible({ timeout: 1000 });
  await expect(page.locator('#refund-spinner')).toBeHidden({ timeout: 6000 });
  const refund = await page.locator("div.bg-white").nth(3).getByTestId('refund-result');
  //console.log(refund);
  await expect(refund).toBeVisible();
  await expect(refund).toContainText("Eligible for refund");
  await expect(refund).toContainText(" Single-ticket bookings qualify for a full refund.");
  //await page.pause();


});