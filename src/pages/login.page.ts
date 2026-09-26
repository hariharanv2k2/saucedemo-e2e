import { type Locator, type Page } from '@playwright/test';
import { LoginSelectors } from '../selectors/login.selectors';

export class LoginPage {
  readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(LoginSelectors.usernameInput);
    this.passwordInput = page.locator(LoginSelectors.passwordInput);
    this.loginButton = page.locator(LoginSelectors.loginButton);
    this.errorMessage = page.locator(LoginSelectors.errorMessage);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
