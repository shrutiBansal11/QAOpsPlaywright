const { expect } = require('@playwright/test');

class signinPage{

constructor(page){
     console.log("I am inside SignIn");
    this.page=page;
    this.username= page.getByPlaceholder("email@example.com");
    this.password= page.getByPlaceholder("enter your passsword");
    this.loginBtn= page.getByRole("button", {name : 'login'});

}
async gotoSigninPage(){
     console.log("I am in SignIn Page 2");
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login"); // this open the URL of application

}
async validSignin(username, password){
    console.log("I am in SignIn Page 3");
     await this.username.fill(username);
    await this.password.fill(password);


}

async clickLoginBtn(){
     console.log("I am in SignIn Page 4");
  await this.loginBtn.click();
    await this.page.waitForLoadState('networkidle');
}
async validateHomePage(){

    await expect(this.page.getByText("Design and Developed By - Kunal Sharma", {exact : true})).toBeVisible();
}
}
module.exports={signinPage};