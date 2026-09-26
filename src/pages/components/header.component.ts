import { type Locator, type Page } from '@playwright/test';
import { HeaderSelectors } from '../../selectors/header.selectors';

export class HeaderComponent {
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly menuButton: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.cartLink = page.locator(HeaderSelectors.cartLink);
    this.cartBadge = page.locator(HeaderSelectors.cartBadge);
    this.menuButton = page.locator(HeaderSelectors.menuButton);
    this.pageTitle = page.locator(HeaderSelectors.pageTitle);
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.textContent();
    return text ? parseInt(text, 10) : 0;
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.cartBadge.isVisible();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async getPageTitle(): Promise<string> {
    return (await this.pageTitle.textContent()) ?? '';
  }
}
