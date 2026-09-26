import { test, expect } from '../../src/fixtures/base.fixture';
import { pickRandom } from '../../src/utils/random.utils';
import { completePurchase } from '../../src/flows/purchase.flow';

test.describe('Checkout Complete', { tag: ['@regression', '@checkout'] }, () => {
  test.beforeEach(async ({
    authenticatedPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    page,
  }) => {
    void authenticatedPage;
    const allNames = await inventoryPage.getProductNames();
    const [product] = pickRandom(allNames);

    await completePurchase(
      { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage, page },
      [product],
    );
  });

  test('CC-01: should show confirmation header and text', async ({
    checkoutCompletePage,
  }) => {
    const header = await checkoutCompletePage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order');

    const text = await checkoutCompletePage.getConfirmationText();
    expect(text.trim()).not.toBe('');
  });

  test('CC-02: should navigate back to inventory via Back Home', async ({
    checkoutCompletePage,
    page,
  }) => {
    await checkoutCompletePage.backHome();

    await expect(page).toHaveURL(/inventory\.html/);
  });
});
