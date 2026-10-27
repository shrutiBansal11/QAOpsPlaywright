import { Locator, Page } from '@playwright/test';

export class CareerAcceleratorPage {
    readonly signUpLink: Locator;

    constructor(page: Page) {
        this.signUpLink = page.getByRole('link', { name: 'Sign Up', exact: true });
    }
}
