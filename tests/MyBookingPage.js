const { test, expect } = require('@playwright/test');
//require('./BookEventPage');

class MyBookingPage {
    constructor(page, bookingref) {
this.page = page;
this.bookingref = bookingref;
this.bookingcard = page.locator("#booking-card").first();
    }

    async validateMyBookingDetails(eventTitle) {

        await expect(this.page).toHaveURL('/bookings');
        await expect(this.bookingcard).toBeVisible();
        await this.page.locator("#booking-card").filter({ hasText: this.bookingref }).textContent();

        await expect(this.bookingcard.filter({ hasText: this.bookingref })).toBeVisible();
        const bookingeventId = await this.page.locator("#booking-card").first().getByText(eventTitle).textContent();
        console.log(bookingeventId) 
        await expect(this.bookingcard).toContainText(eventTitle);


        await this.page.waitForTimeout(5000);

    }
}
module.exports = { MyBookingPage };