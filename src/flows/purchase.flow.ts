import { type Page } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInfoPage } from '../pages/checkout-info.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutInfo } from '../types';
import { generateCheckoutInfo } from '../data/checkout.data';

interface PurchasePages {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  page: Page;
}

export async function completePurchase(
  pages: PurchasePages,
  productNames: string[],
  checkoutInfo?: CheckoutInfo,
): Promise<void> {
  const info = checkoutInfo ?? generateCheckoutInfo();

  for (const name of productNames) {
    await pages.inventoryPage.addItemToCartByName(name);
  }

  await pages.inventoryPage.header.openCart();
  await pages.page.waitForURL(/cart\.html/);
  await pages.cartPage.checkout();
  await pages.page.waitForURL(/checkout-step-one\.html/);
  await pages.checkoutInfoPage.fillForm(info);
  await pages.checkoutInfoPage.continue();
  await pages.page.waitForURL(/checkout-step-two\.html/);
  await pages.checkoutOverviewPage.finish();
}
