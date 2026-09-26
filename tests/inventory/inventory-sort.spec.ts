import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Inventory - Sorting', { tag: ['@regression', '@inventory'] }, () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('I-02: should display products sorted A-Z by default', async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('I-03: should sort products Z-A', async ({ inventoryPage }) => {
    const namesBefore = await inventoryPage.getProductNames();
    await inventoryPage.sortBy('za');
    const namesAfter = await inventoryPage.getProductNames();

    const expected = [...namesBefore].sort((a, b) => b.localeCompare(a));
    expect(namesAfter).toEqual(expected);
  });

  test('I-04: should sort products price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();

    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test('I-05: should sort products price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();

    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i - 1]);
    }
  });
});
