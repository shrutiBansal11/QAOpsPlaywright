import { Page } from '@playwright/test';

export class LocatorPracticePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(): Promise<void> {
        await this.page.goto('https://rahulshettyacademy.com/locatorspractice/');
    }

    async clickBlinkingText(): Promise<Page> {
        const popupPromise = this.page.waitForEvent('popup');
        const blinkingTextLink = this.page.getByRole('link', { name: /Explore the QA Career Accelerator/ });
        await blinkingTextLink.waitFor({ state: 'visible' });
        await blinkingTextLink.dispatchEvent('click');
        const careerAcceleratorPage = await popupPromise;
        await careerAcceleratorPage.waitForLoadState('domcontentloaded');
        return careerAcceleratorPage;
    }
}
