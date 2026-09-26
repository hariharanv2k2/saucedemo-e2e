import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutInfoSelectors } from '../selectors/checkout-info.selectors';
import { CheckoutInfo } from '../types';

export class CheckoutInfoPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator(CheckoutInfoSelectors.firstNameInput);
    this.lastNameInput = page.locator(CheckoutInfoSelectors.lastNameInput);
    this.postalCodeInput = page.locator(CheckoutInfoSelectors.postalCodeInput);
    this.continueButton = page.locator(CheckoutInfoSelectors.continueButton);
    this.cancelButton = page.locator(CheckoutInfoSelectors.cancelButton);
    this.errorMessage = page.locator(CheckoutInfoSelectors.errorMessage);
  }

  async fillForm(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
