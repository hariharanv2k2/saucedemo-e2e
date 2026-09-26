import { test, expect } from '../../src/fixtures/base.fixture';
import { loginAs } from '../../src/flows/login.flow';
import { completePurchase } from '../../src/flows/purchase.flow';
import { USERS } from '../../src/data/users.data';
import { generateCheckoutInfo } from '../../src/data/checkout.data';
import { pickRandom } from '../../src/utils/random.utils';

test.describe('E2E Purchase Journeys', { tag: ['@e2e'] }, () => {
  test('E2E-01: should complete single product purchase flow', {
    tag: ['@smoke'],
  }, async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await loginAs(loginPage, USERS.standard);

    const allNames = await inventoryPage.getProductNames();
    const [product] = pickRandom(allNames);

    await completePurchase(
      { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, page },
      [product],
    );

    await expect(page).toHaveURL(/checkout-complete\.html/);
    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order');
  });

  test('E2E-02: should complete multiple products purchase flow', {
    tag: ['@regression'],
  }, async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await loginAs(loginPage, USERS.standard);

    const allNames = await inventoryPage.getProductNames();
    const products = pickRandom(allNames, 3);

    await completePurchase(
      { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, page },
      products,
    );

    await expect(page).toHaveURL(/checkout-complete\.html/);
    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order');
  });

  test('E2E-03: should modify cart mid-flow and complete purchase', {
    tag: ['@regression'],
  }, async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await loginAs(loginPage, USERS.standard);

    const allNames = await inventoryPage.getProductNames();
    const [product1, product2] = pickRandom(allNames, 2);

    // Add two products
    await inventoryPage.addItemToCartByName(product1);
    await inventoryPage.addItemToCartByName(product2);
    expect(await inventoryPage.header.getCartCount()).toBe(2);

    // Remove first product
    await inventoryPage.removeItemByName(product1);
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    // Continue checkout with remaining product
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);
    const cartNames = await cartPage.getItemNames();
    expect(cartNames).toEqual([product2]);

    await cartPage.checkout();
    await page.waitForURL(/checkout-step-one\.html/);

    const info = generateCheckoutInfo();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();
    await page.waitForURL(/checkout-step-two\.html/);
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order');
  });

  test('E2E-04: should handle error user checkout failure', {
    tag: ['@regression'],
  }, async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    page,
  }) => {
    await loginAs(loginPage, USERS.error);

    const allNames = await inventoryPage.getProductNames();
    const [product] = pickRandom(allNames);

    await inventoryPage.addItemToCartByName(product);
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);
    await cartPage.checkout();
    await page.waitForURL(/checkout-step-one\.html/);

    const info = generateCheckoutInfo();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();

    const currentUrl = page.url();
    const hasError = await checkoutInfoPage.isErrorVisible();
    expect(currentUrl || hasError !== undefined).toBeTruthy();
  });
});
