import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CartSelectors } from '../selectors/cart.selectors';
import { parsePrice } from '../utils/price.utils';

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(CartSelectors.cartItem);
    this.continueShoppingButton = page.locator(CartSelectors.continueShoppingButton);
    this.checkoutButton = page.locator(CartSelectors.checkoutButton);
  }

  async getItemCount(): Promise<number> {
    await this.checkoutButton.waitFor();
    return this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    await this.checkoutButton.waitFor();
    return this.cartItems.locator(CartSelectors.itemName).allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    await this.checkoutButton.waitFor();
    const texts = await this.cartItems.locator(CartSelectors.itemPrice).allTextContents();
    return texts.map(parsePrice);
  }

  async getItemQuantities(): Promise<string[]> {
    await this.checkoutButton.waitFor();
    return this.cartItems.locator(CartSelectors.itemQuantity).allTextContents();
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.waitFor();
    await this.checkoutButton.click();
  }
}
