import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';

test.describe('Inventory - Cart Interactions', { tag: ['@inventory'] }, () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('I-07: should add random product to cart, button changes and badge appears', {
    tag: ['@smoke'],
  }, async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    const [product] = pickRandom(names);

    await inventoryPage.addItemToCartByName(product);

    const buttonText = await inventoryPage.getAddToCartButtonText(product);
    expect(buttonText.toUpperCase()).toContain('REMOVE');

    const badgeVisible = await inventoryPage.header.isCartBadgeVisible();
    expect(badgeVisible).toBe(true);

    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(1);
  });

  test('I-08: should remove from cart, button restores and badge updates', {
    tag: ['@regression'],
  }, async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    const [product] = pickRandom(names);

    await inventoryPage.addItemToCartByName(product);
    expect(await inventoryPage.header.getCartCount()).toBe(1);

    await inventoryPage.removeItemByName(product);

    const buttonText = await inventoryPage.getAddToCartButtonText(product);
    expect(buttonText.toUpperCase()).toContain('ADD TO CART');

    const badgeVisible = await inventoryPage.header.isCartBadgeVisible();
    expect(badgeVisible).toBe(false);
  });

  test('I-09: should add all products and update cart badge accordingly', {
    tag: ['@regression'],
  }, async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();

    for (const name of names) {
      await inventoryPage.addItemToCartByName(name);
    }

    const count = await inventoryPage.header.getCartCount();
    expect(count).toBe(names.length);
  });
});
