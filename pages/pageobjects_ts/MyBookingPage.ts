
//require('./BookEventPage');
import { test, expect, Page, Locator } from '@playwright/test';
export class MyBookingPage {
    page:Page;
    bookingref:any;
    bookingcard:Locator;

    constructor(page:Page, bookingref:any) {
this.page = page;
this.bookingref = bookingref;
this.bookingcard = page.locator("#booking-card").first();
    }

    async validateMyBookingDetails(eventTitle) {

        await expect(this.page).toHaveURL('/bookings');
        await expect(this.bookingcard).toBeVisible();
        await this.bookingcard.filter({ hasText: this.bookingref }).textContent();

        await expect(this.bookingcard.filter({ hasText: this.bookingref })).toBeVisible();
        const bookingeventId = await this.page.locator("#booking-card").first().getByText(eventTitle).textContent();
        console.log(bookingeventId) 
        await expect(this.bookingcard).toContainText(eventTitle);


        await this.page.waitForTimeout(5000);

    }
}
module.exports = { MyBookingPage };