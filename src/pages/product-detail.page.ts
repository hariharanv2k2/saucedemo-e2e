import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ProductDetailSelectors } from '../selectors/product-detail.selectors';
import { parsePrice } from '../utils/price.utils';

export class ProductDetailPage extends BasePage {
  private readonly backButton: Locator;
  private readonly productName: Locator;
  private readonly productDescription: Locator;
  private readonly productPrice: Locator;
  private readonly productImage: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backButton = page.locator(ProductDetailSelectors.backButton);
    this.productName = page.locator(ProductDetailSelectors.productName);
    this.productDescription = page.locator(ProductDetailSelectors.productDescription);
    this.productPrice = page.locator(ProductDetailSelectors.productPrice);
    this.productImage = page.locator(ProductDetailSelectors.productImage);
    const detailContainer = page.locator(ProductDetailSelectors.container);
    this.addToCartButton = detailContainer.getByRole('button', { name: 'Add to cart' });
    this.removeButton = detailContainer.getByRole('button', { name: 'Remove' });
  }

  async getProductName(): Promise<string> {
    return (await this.productName.textContent()) ?? '';
  }

  async getDescription(): Promise<string> {
    return (await this.productDescription.textContent()) ?? '';
  }

  async getPrice(): Promise<number> {
    const text = (await this.productPrice.textContent()) ?? '';
    return parsePrice(text);
  }

  async getImageSrc(): Promise<string> {
    return (await this.productImage.getAttribute('src')) ?? '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.addToCartButton.isVisible();
  }

  async isRemoveVisible(): Promise<boolean> {
    return this.removeButton.isVisible();
  }
}
