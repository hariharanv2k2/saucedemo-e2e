import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SortOption, SORT_VALUES } from '../types';
import { InventorySelectors } from '../selectors/inventory.selectors';
import { parsePrice } from '../utils/price.utils';

export class InventoryPage extends BasePage {
  private readonly sortDropdown: Locator;
  private readonly inventoryItems: Locator;
  private readonly itemNames: Locator;
  private readonly itemDescriptions: Locator;
  private readonly itemPrices: Locator;
  private readonly itemImages: Locator;

  constructor(page: Page) {
    super(page);
    this.sortDropdown = page.locator(InventorySelectors.sortDropdown);
    this.inventoryItems = page.locator(InventorySelectors.inventoryItem);
    this.itemNames = page.locator(InventorySelectors.itemName);
    this.itemDescriptions = page.locator(InventorySelectors.itemDescription);
    this.itemPrices = page.locator(InventorySelectors.itemPrice);
    this.itemImages = page.locator(InventorySelectors.itemImage);
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(SORT_VALUES[option]);
  }

  async getProductNames(): Promise<string[]> {
    await this.itemNames.first().waitFor();
    return this.itemNames.allTextContents();
  }

  async getProductDescriptions(): Promise<string[]> {
    return this.itemDescriptions.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map(parsePrice);
  }

  async getProductImages(): Promise<string[]> {
    const count = await this.itemImages.count();
    const srcs: string[] = [];
    for (let i = 0; i < count; i++) {
      const src = await this.itemImages.nth(i).getAttribute('src');
      srcs.push(src ?? '');
    }
    return srcs;
  }

  async addItemToCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async openProductByName(productName: string): Promise<void> {
    await this.itemNames.filter({ hasText: productName }).click();
  }

  async getAddToCartButtonText(productName: string): Promise<string> {
    const item = this.inventoryItems.filter({ hasText: productName });
    return (await item.locator(InventorySelectors.addToCartButton).textContent()) ?? '';
  }
}
