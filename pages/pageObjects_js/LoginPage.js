const { expect } = require('@playwright/test');

class LoginPage{

constructor(page){
    this.page=page;
    this.username= page.getByPlaceholder('you@email.com');
    this.password= page.getByPlaceholder('••••••');
    this.loginBtn= page.locator('#login-btn');

}
async gotoLoginPage(){
    await this.page.goto('/login');
}
async validLogin(username, password){
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