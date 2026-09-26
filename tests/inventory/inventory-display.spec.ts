import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';

test.describe('Inventory - Display', { tag: ['@inventory'] }, () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('I-01: should display products with name, description, price, and image', {
    tag: ['@smoke'],
  }, async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    const descriptions = await inventoryPage.getProductDescriptions();
    const prices = await inventoryPage.getProductPrices();
    const images = await inventoryPage.getProductImages();

    expect(names.length).toBeGreaterThan(0);
    expect(descriptions).toHaveLength(names.length);
    expect(prices).toHaveLength(names.length);
    expect(images).toHaveLength(names.length);

    for (const name of names) {
      expect(name.trim()).not.toBe('');
    }
    for (const desc of descriptions) {
      expect(desc.trim()).not.toBe('');
    }
    for (const price of prices) {
      expect(price).toBeGreaterThan(0);
    }
    for (const img of images) {
      expect(img).not.toBe('');
    }
  });

  test('I-06: should navigate to correct product detail when clicking product name', {
    tag: ['@regression'],
  }, async ({ inventoryPage, productDetailPage, page }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.openProductByName(selectedName);
    await page.waitForURL(/inventory-item\.html/);

    const detailName = await productDetailPage.getProductName();
    expect(detailName).toBe(selectedName);
  });
});
