import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';
import { generateCheckoutInfo } from '../../src/data/checkout.data';

test.describe('Checkout Overview', { tag: ['@checkout'] }, () => {
  let addedProducts: string[] = [];

  test.beforeEach(async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    page,
  }) => {
    void authenticatedPage;
    const allNames = await inventoryPage.getProductNames();
    addedProducts = pickRandom(allNames, 2);

    for (const name of addedProducts) {
      await inventoryPage.addItemToCartByName(name);
    }
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);
    await cartPage.checkout();
    await page.waitForURL(/checkout-step-one\.html/);

    const info = generateCheckoutInfo();
    await checkoutInfoPage.fillForm(info);
    await checkoutInfoPage.continue();
    await page.waitForURL(/checkout-step-two\.html/);
  });

  test('CO-01: should display correct items and quantities', {
    tag: ['@regression'],
  }, async ({ checkoutOverviewPage }) => {
    const overviewNames = await checkoutOverviewPage.getItemNames();
    const quantities = await checkoutOverviewPage.getItemQuantities();

    expect(overviewNames.sort()).toEqual(addedProducts.sort());
    for (const qty of quantities) {
      expect(qty.trim()).toBe('1');
    }
  });

  test('CO-02: should calculate subtotal + tax = total correctly', {
    tag: ['@smoke'],
  }, async ({ checkoutOverviewPage }) => {
    const itemPrices = await checkoutOverviewPage.getItemPrices();
    const expectedSubtotal = itemPrices.reduce((sum, p) => sum + p, 0);

    const subtotal = await checkoutOverviewPage.getSubtotal();
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);

    const tax = await checkoutOverviewPage.getTax();
    const total = await checkoutOverviewPage.getTotal();
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('CO-03: should complete order when clicking Finish', {
    tag: ['@regression'],
  }, async ({ checkoutOverviewPage, page }) => {
    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/);
  });
});
