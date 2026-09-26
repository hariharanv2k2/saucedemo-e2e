import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutOverviewSelectors } from '../selectors/checkout-overview.selectors';
import { parsePrice } from '../utils/price.utils';

export class CheckoutOverviewPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(CheckoutOverviewSelectors.cartItem);
    this.subtotalLabel = page.locator(CheckoutOverviewSelectors.subtotalLabel);
    this.taxLabel = page.locator(CheckoutOverviewSelectors.taxLabel);
    this.totalLabel = page.locator(CheckoutOverviewSelectors.totalLabel);
    this.finishButton = page.locator(CheckoutOverviewSelectors.finishButton);
    this.cancelButton = page.locator(CheckoutOverviewSelectors.cancelButton);
  }

  async getItemNames(): Promise<string[]> {
    await this.cartItems.first().waitFor();
    return this.cartItems.locator(CheckoutOverviewSelectors.itemName).allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    await this.cartItems.first().waitFor();
    const texts = await this.cartItems
      .locator(CheckoutOverviewSelectors.itemPrice)
      .allTextContents();
    return texts.map(parsePrice);
  }

  async getItemQuantities(): Promise<string[]> {
    await this.cartItems.first().waitFor();
    return this.cartItems.locator(CheckoutOverviewSelectors.itemQuantity).allTextContents();
  }

  async getSubtotal(): Promise<number> {
    const text = (await this.subtotalLabel.textContent()) ?? '';
    return parsePrice(text);
  }

  async getTax(): Promise<number> {
    const text = (await this.taxLabel.textContent()) ?? '';
    return parsePrice(text);
  }

  async getTotal(): Promise<number> {
    const text = (await this.totalLabel.textContent()) ?? '';
    return parsePrice(text);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
