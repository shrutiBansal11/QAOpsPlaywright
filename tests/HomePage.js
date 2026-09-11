class HomePage {
    constructor(page) {

        this.page = page;
        this.adminBtn = page.getByRole("button", { name: "Admin" });
        this.adminDropdown = page.getByRole('navigation').getByRole('link', { name: 'Manage Events' });
    }
    async navigatetoManageEventsPage() {

        await this.adminBtn.click();
        await this.adminDropdown.click();
    }


}
module.exports = { HomePage };



