import {LoginPage} from './LoginPage';
import {HomePage} from './HomePage';
import { CreateEventPage } from './CreateEventPage';
import { EventsPage } from './EventsPage'
import { BookEventPage } from './BookEventPage';
import { MyBookingPage } from './MyBookingPage';
import { Page } from '@playwright/test';


 class POManager{
    loginPage:LoginPage;
    homePage: HomePage;
    createEventPage:CreateEventPage;
    eventsPage:EventsPage;
    bookEventPage: BookEventPage;
    myBookingPage: MyBookingPage;
    page:Page

constructor(page:any){
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