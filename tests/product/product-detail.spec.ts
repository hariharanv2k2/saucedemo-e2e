import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';

test.describe('Product Detail', { tag: ['@regression', '@product'] }, () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    void authenticatedPage;
  });

  test('PD-01: should show correct name, description, price, and image', async ({
    inventoryPage,
    productDetailPage,
    page,
  }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.openProductByName(selectedName);
    await page.waitForURL(/inventory-item\.html/);

    const detailName = await productDetailPage.getProductName();
    const description = await productDetailPage.getDescription();
    const price = await productDetailPage.getPrice();
    const imageSrc = await productDetailPage.getImageSrc();

    expect(detailName).toBe(selectedName);
    expect(description.trim()).not.toBe('');
    expect(price).toBeGreaterThan(0);
    expect(imageSrc).not.toBe('');
  });

  test('PD-02: should add to cart and remove from cart on detail page', async ({
    inventoryPage,
    productDetailPage,
    page,
  }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.openProductByName(selectedName);
    await page.waitForURL(/inventory-item\.html/);

    await productDetailPage.addToCart();
    expect(await productDetailPage.isRemoveVisible()).toBe(true);
    expect(await productDetailPage.header.getCartCount()).toBe(1);

    await productDetailPage.removeFromCart();
    expect(await productDetailPage.isAddToCartVisible()).toBe(true);
    expect(await productDetailPage.header.isCartBadgeVisible()).toBe(false);
  });

  test('PD-03: should navigate back to products from detail page', async ({
    inventoryPage,
    productDetailPage,
    page,
  }) => {
    const allNames = await inventoryPage.getProductNames();
    const [selectedName] = pickRandom(allNames);

    await inventoryPage.openProductByName(selectedName);
    await page.waitForURL(/inventory-item\.html/);
    await productDetailPage.backToProducts();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});
