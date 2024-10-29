import { browser, expect } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

describe('My Login application', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();  // Maximizing window before each test
    });

    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('vendor01', '12345678');
        const addProductButton = await $('button.btn.btn-sm.green-button.w-100.w-md-auto');
        await addProductButton.click();
        
        const categoryText = await $('//*[contains(text(), "Product Category")]');
        await categoryText.waitForDisplayed({ timeout: 5000 });  // Waits up to 5 seconds
        const categoryDropdown = await $('#category'); // Select the dropdown by its ID
        await categoryDropdown.selectByVisibleText('Pro Category 1');
        const productCode = await $('#product-code');
        await productCode.setValue ('23242');
        const ProductNameInput = await $('#product-name');
        await ProductNameInput.setValue('Coca-Cola');
        const productPriceInput = await $('#product-price');
        await productPriceInput.setValue(393);
        const discountInput = await $('#discount-percentage');
        await discountInput.setValue('6');

        const skuInput = await $('#sku-number');
        await skuInput.setValue('p-3894');
        const quantityInput = await $('#total-qty');
        await quantityInput.setValue('4');
        await browser.pause(5000);


        expect(await SecurePage.someElementOnSecurePage).toBeDisplayed();
    });
});