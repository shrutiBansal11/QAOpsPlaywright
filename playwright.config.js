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
const config   = ({
  //testDir: './tests/e2e',
  //retries: 1,
  //workers:4,
  timeout:60000, //maximum time one test can run for
  expect : {
    timeout: 50000, //maximum time one assertion can run for
  },
  reporter : [['html', { open: 'never' }]],
  projects: [
    {
      name: 'UI',
      testDir: './tests/UI',
      retries: 1,
      use: {
        browserName: 'chromium',  //use to define the browser type, webkit- used for safari
        headless : true,
        screenshot : 'only-on-failure',
        trace: 'on-first-retry' // traces for failed test cases
      },
    },
    {
      name: 'UI_API',
      testDir: './tests/UI_API',
      use: {
        browserName: 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
      },
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: {
        browserName: 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
      },
    },
    {
      name: 'Miscellaneous',
      testDir: './tests/Miscellaneous',
      use: {
        browserName: 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'retain-on-failure',
      },
    },
  ],
  use: {
    //actionTimeout: 10*1000,
   //navigationTimeout : 30 * 1000,
    baseURL: 'https://eventhub.rahulshettyacademy.com/login',
  }
});

// @ts-ignore
module.exports = config // use these config across all projects
