import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutCompleteSelectors } from '../selectors/checkout-complete.selectors';

export class CheckoutCompletePage extends BasePage {
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.completeHeader = page.locator(CheckoutCompleteSelectors.completeHeader);
    this.completeText = page.locator(CheckoutCompleteSelectors.completeText);
    this.backHomeButton = page.locator(CheckoutCompleteSelectors.backHomeButton);
  }

  async getConfirmationHeader(): Promise<string> {
    return (await this.completeHeader.textContent()) ?? '';
  }

  async getConfirmationText(): Promise<string> {
    return (await this.completeText.textContent()) ?? '';
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
