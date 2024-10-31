// File: dashboard.e2e.js
import { browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';

describe('My Login application - Dashboard Visit', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizing window before each test
    });

    it('should visit dashboard', async () => {
        await LoginPage.open();
        await LoginPage.login('vendor01', '12345678');
        
        const dashboardButton = await $('div.d-flex.justify-content-start.align-items-center.w-100.m-0.p-0.active-pill-button.rounded-pill');
        await dashboardButton.waitForDisplayed();
        await dashboardButton.click();
    });
});
