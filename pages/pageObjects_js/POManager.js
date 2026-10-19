const { LoginPage } = require('./LoginPage');
const { HomePage } = require('./HomePage');
const { CreateEventPage } = require('./CreateEventPage');
const { EventsPage} = require('./EventsPage');
 const {BookEventPage} = require('./BookEventPage');
 const{MyBookingPage} = require('./MyBookingPage');

 class POManager{

constructor(page){
    this.page=page;
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.createEventPage = new CreateEventPage(this.page);
    this.eventsPage = new EventsPage(this.page);
    this.bookEventPage = new BookEventPage(this.page);
    this.myBookingPage = new MyBookingPage(this.page);

}
getLoginPage(){
    return this.loginPage;
}
getHomePage(){
    return this.homePage;
}
getCreateEventPage(){
    return this.createEventPage;
}
getEventsPage(){
    return this.eventsPage;
}
getBookEventPage(){
    return this.bookEventPage;
}
getMyBookingPage(){
    return this.myBookingPage;
}   


 }
 module.exports = { POManager };