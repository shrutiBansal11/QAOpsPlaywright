const { test, expect } = require('@playwright/test');
class EventsPage   {
    constructor(page) {
        this.page = page;
        this.alleventcards = page.locator("#event-card");
       
    }

async validateEventDetails(eventTitle) {

     
      await expect(this.alleventcards.first()).toBeVisible();
      await expect(this.alleventcards.filter({ hasText: eventTitle })).toBeVisible({ timeout: 5_000 });
}

async getSeatCount(eventTitle) {
      const seatsText = await this.alleventcards.filter({ hasText: eventTitle }).getByText("seats").innerText();
      //console.log(seats);
      const match = seatsText.match(/\d+/);   // finds the first sequence of digits
      return parseInt(match[0], 10);
    

}     

async navigatetoBookEventPage(eventTitle){

 this.alleventcards.filter({ hasText: eventTitle }).getByTestId('book-now-btn').click();
}

}

module.exports = { EventsPage };