const { test, expect } = require('@playwright/test');

class BookEventPage {
    constructor(page) {
        this.page = page;
        this.ticketCount = page.locator("#ticket-count");
        this.customerName = page.locator("#customerName");
        this.customerEmail = page.locator("#customer-email");
        this.customerPhone = page.locator("#phone");
        this.confirmBookingBtn = page.getByRole('button', { name: 'Confirm Booking' });
    

    }

    async bookEvent(customerName, customerEmail, customerPhone) {
        await expect(this.ticketCount).toHaveText("1");
        await this.customerName.fill(customerName);
        await this.customerEmail.fill(customerEmail);
        await this.customerPhone.fill(customerPhone);
        await this.confirmBookingBtn.click();
    }

    async validateBookingRef() {
        const bookingref = await this.page.locator(".booking-ref").first().textContent();
        await expect(this.page.locator(".booking-ref").first()).toBeVisible();
        return bookingref;
    }


    async navigateToMyBookingsPage() {
  await this.page.getByRole('button', { name: 'View My Bookings' }).click();
    }



  

    }




module.exports = { BookEventPage };