const { signinPage } = require('./signinPage')

class poManager {

    constructor(page) {
        console.log("I am inside POM Manger");
        this.page = page;
        this.signinPageOBJ = new signinPage(this.page);


    }
    getSignInPage() {
        return this.signinPageOBJ;
    }

}
module.exports = { poManager };