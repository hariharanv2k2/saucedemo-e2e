import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';
import {
  generateCheckoutInfo,
  generateMissingFirstName,
  generateMissingLastName,
  generateMissingPostalCode,
} from '../../src/data/checkout.data';

test.describe('Checkout Info', { tag: ['@checkout'] }, () => {
  test.beforeEach(async ({ authenticatedPage, inventoryPage, cartPage, page }) => {
    void authenticatedPage;
    const allNames = await inventoryPage.getProductNames();
    const [product] = pickRandom(allNames);
    await inventoryPage.addItemToCartByName(product);
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);
    await cartPage.checkout();
    await page.waitForURL(/checkout-step-one\.html/);
  });

  test('CH-01: should proceed to overview with valid checkout info', {
    tag: ['@regression'],
  }, async ({ checkoutInfoPage, page }) => {
    const info = generateCheckoutInfo();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('CH-02: should show error for missing first name', { tag: ['@regression'] }, async ({
    checkoutInfoPage,
  }) => {
    const info = generateMissingFirstName();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();

    const error = await checkoutInfoPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('CH-03: should show error for missing last name', { tag: ['@regression'] }, async ({
    checkoutInfoPage,
  }) => {
    const info = generateMissingLastName();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();

    const error = await checkoutInfoPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('CH-04: should show error for missing postal code', { tag: ['@regression'] }, async ({
    checkoutInfoPage,
  }) => {
    const info = generateMissingPostalCode();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();

    const error = await checkoutInfoPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('CH-05: should return to cart when clicking cancel', { tag: ['@regression'] }, async ({
    checkoutInfoPage,
    page,
  }) => {
    await checkoutInfoPage.cancel();

    await expect(page).toHaveURL(/cart\.html/);
  });
});
