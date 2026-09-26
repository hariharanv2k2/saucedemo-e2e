import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';

test.describe('Cart Management', { tag: ['@cart'] }, () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('C-01: should display added items with matching details', {
    tag: ['@smoke'],
  }, async ({ inventoryPage, cartPage, page }) => {
    const allNames = await inventoryPage.getProductNames();
    const allPrices = await inventoryPage.getProductPrices();
    const [selectedName] = pickRandom(allNames);
    const selectedIndex = allNames.indexOf(selectedName);
    const selectedPrice = allPrices[selectedIndex];

    await inventoryPage.addItemToCartByName(selectedName);
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);

    const cartNames = await cartPage.getItemNames();
    const cartPrices = await cartPage.getItemPrices();

    expect(cartNames).toContain(selectedName);
    expect(cartPrices).toContain(selectedPrice);
  });

  test('C-02: should remove item from cart', { tag: ['@regression'] }, async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.addItemToCartByName(selectedName);
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);

    expect(await cartPage.getItemCount()).toBe(1);

    await cartPage.removeItem(selectedName);

    expect(await cartPage.getItemCount()).toBe(0);
  });

  test('C-03: should return to inventory via Continue Shopping', {
    tag: ['@regression'],
  }, async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('C-04: should persist cart items after navigating away and back', {
    tag: ['@regression'],
  }, async ({ inventoryPage, cartPage, page }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.addItemToCartByName(selectedName);
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);

    expect(await cartPage.getItemCount()).toBe(1);

    await cartPage.continueShopping();
    await page.waitForURL(/inventory\.html/);
    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);

    const cartNames = await cartPage.getItemNames();
    expect(cartNames).toContain(selectedName);
  });

  test('C-05: should handle add, remove, and re-add same product', {
    tag: ['@regression'],
  }, async ({ inventoryPage, cartPage, page }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.addItemToCartByName(selectedName);
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.removeItemByName(selectedName);
    expect(await inventoryPage.header.isCartBadgeVisible()).toBe(false);

    await inventoryPage.addItemToCartByName(selectedName);
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.header.openCart();
    await page.waitForURL(/cart\.html/);
    const cartNames = await cartPage.getItemNames();
    expect(cartNames).toContain(selectedName);
  });
});
