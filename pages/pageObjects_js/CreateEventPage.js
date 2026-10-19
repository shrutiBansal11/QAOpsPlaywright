const { test, expect } = require('@playwright/test');
class CreateEventPage {


    constructor(page) {
        this.page = page;
        this.eventTitleInput = page.locator('#event-title-input');
        this.eventDescriptionInput = page.locator('#admin-event-form textarea');
        this.categoryDropdown = page.locator("#category");
        this.cityInput = page.getByLabel('City');
        this.venueInput = page.getByLabel('Venue');
        this.eventDateInput = page.getByLabel('Event Date & Time');
        this.priceInput = page.getByLabel('Price ($)');
        this.totalSeatsInput = page.locator('#total-seats');
        this.addEventBtn = page.locator('#add-event-btn');
        this.EventBtn =  page.locator('#nav-events');
    }

    async createNewEvent(eventTitle, eventDate) {

        await this.eventTitleInput.fill(eventTitle);
        await this.eventDescriptionInput.fill("Hands-on coding workshop designed for absolute beginners. Build a live personal portfolio page.");
        await this.categoryDropdown.selectOption("Workshop");
        await this.cityInput.fill('Hyderabad');
        await this.venueInput.fill("Melbourne Connect, 700 Swanston St, Carlton VIC");
        await this.eventDateInput.fill(eventDate);
        await this.priceInput.fill('200');
        await this.totalSeatsInput.fill('50');
        await this.addEventBtn.click();


       // const message = await page.getByText("Event Created").textContent();
       //console.log(message);
        await expect(this.page.getByText("Event Created")).toBeVisible();


    }
    async navigateToEventsPage() {
        await this.EventBtn.click();
    }
}

module.exports = { CreateEventPage };