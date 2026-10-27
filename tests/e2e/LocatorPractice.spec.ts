import { expect, test } from '@playwright/test';
import { CareerAcceleratorPage } from '../../pages/pageobjects_ts/CareerAcceleratorPage';
import { LocatorPracticePage } from '../../pages/pageobjects_ts/LocatorPracticePage';

test('blinking text opens career accelerator with an enabled Sign Up link', async ({ page }) => {
    const locatorPracticePage = new LocatorPracticePage(page);
    await locatorPracticePage.open();

    const careerAcceleratorTab = await locatorPracticePage.clickBlinkingText();
    const careerAcceleratorPage = new CareerAcceleratorPage(careerAcceleratorTab);

    await expect(careerAcceleratorPage.signUpLink).toBeVisible();
    await expect(careerAcceleratorPage.signUpLink).toBeEnabled();
});
