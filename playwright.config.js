// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests/',
  timeout:60000, //maximum time one test can run for
  expect : {
    timeout: 50000, //maximum time one assertion can run for
  },
  reporter : 'html',
  use: {
    //actionTimeout: 10*1000,
   //navigationTimeout : 30 * 1000,
    browserName: 'chromium',  //use to define the browser type, webkit- used for safari
    baseURL: 'https://eventhub.rahulshettyacademy.com/login',
    headless : false,
    screenshot : 'on',
    trace : 'on', //traces for all test cases
    //trace : 'retain-on-failure' // traces for failed test cases
  }
});

module.exports = config // use these config across all projects


