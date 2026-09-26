import { type Locator, type Page } from '@playwright/test';
import { MenuSelectors } from '../../selectors/menu.selectors';

export class MenuComponent {
  private readonly allItemsLink: Locator;
  private readonly aboutLink: Locator;
  private readonly logoutLink: Locator;
  private readonly resetLink: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    this.allItemsLink = page.locator(MenuSelectors.allItemsLink);
    this.aboutLink = page.locator(MenuSelectors.aboutLink);
    this.logoutLink = page.locator(MenuSelectors.logoutLink);
    this.resetLink = page.locator(MenuSelectors.resetLink);
    this.closeButton = page.locator(MenuSelectors.closeButton);
  }

  async logout(): Promise<void> {
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }

  async allItems(): Promise<void> {
    await this.allItemsLink.waitFor({ state: 'visible' });
    await this.allItemsLink.click();
  }

  async resetAppState(): Promise<void> {
    await this.resetLink.waitFor({ state: 'visible' });
    await this.resetLink.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
