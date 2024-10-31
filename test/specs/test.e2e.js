import { browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

// First Part: Add Product Workflow
describe('My Login application - Add Product Workflow', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizing window before each test
    });

    it('should login with valid credentials and add a product', async () => {
        await LoginPage.open();
        await LoginPage.login('vendor01', '12345678');
        
        const addProductButton = await $('button.btn.btn-sm.green-button.w-100.w-md-auto');
        await addProductButton.click();
        
        const categoryText = await $('//*[contains(text(), "Product Category")]');
        await categoryText.waitForDisplayed({ timeout: 5000 });  // Waits up to 5 seconds
        const categoryDropdown = await $('#category');
        await categoryDropdown.selectByVisibleText('Pro Category 1');
        
        await $('#product-code').setValue('23242');
        await $('#product-name').setValue('Coca-Cola');
        await $('#product-price').setValue(393);
        await $('#discount-percentage').setValue('6');
        await $('#sku-number').setValue('p-3894');
        await $('#total-qty').setValue('4');
        await $('#product-info').setValue("This is product info");

        const sizeButton = await $('//button[contains(text(), "M")]');
        await sizeButton.click();
        
        const filePath = '/Users/Durjoy/Downloads/images.png';
        const remoteFilePath = await browser.uploadFile(filePath);
        await $('#main-image').setValue(remoteFilePath);

        const sndRemoteFilePath = await browser.uploadFile(filePath);
        await $('#product-image-0').setValue(sndRemoteFilePath);
        await $('#color-name-0').setValue('Black');
        await $('button[type="submit"]').click();

        await browser.pause(5000);

        expect(await SecurePage.someElementOnSecurePage).toBeDisplayed();
    });
    
    it('should visit Return & Refund section', async () => {
        const returnOrRefund = await $('p.ps-2.ps-md-3.text-start');
        await returnOrRefund.waitForDisplayed();
        await returnOrRefund.click();
        await browser.pause(5000); // Wait for 5 seconds
    });
});