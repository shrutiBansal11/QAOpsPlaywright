const { test, expect } = require('@playwright/test');
const Excelfile = require('../utils/ExcelUtil');

// verify is Apple is replaced by Iphone
test('download upload excel test', async ({ page }) => {

    const currentValue = "Apple";
    const newValue = "Iphone";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const promisedownload = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await promisedownload;

    const filepath = "/Users/shrutibansal/Downloads/download.xlsx";
    await download.saveAs(filepath);

    await Excelfile.writeExcel(currentValue, filepath, newValue);
    await page.locator("#fileinput").click();
    //attribute, type = file must be present to upload a file, if not present then it will not work. 
    // It is a security feature of browser to avoid malicious code to upload file from local machine.

    await page.locator("#fileinput").setInputFiles(filepath);

    const text = await page.getByRole('cell', { name: newValue });
    await expect(text).toBeVisible();

})