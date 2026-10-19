import { test, expect,Page,Locator } from '@playwright/test';

export class LoginPage{
page:Page;
username:Locator;
password:Locator;
loginBtn:Locator;

constructor(page:Page){
    this.page=page;
    this.username= page.getByPlaceholder('you@email.com');
    this.password= page.getByPlaceholder('••••••');
    this.loginBtn= page.locator('#login-btn');

}
async gotoLoginPage(){
    await this.page.goto('/login');
}
async validLogin(username:string, password:string){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');

}
async verifyHomePageLoaded(){

    await expect(this.page.getByText("Browse Events →", {exact : true})).toBeVisible();
}
}
module.exports={LoginPage};