export const ProductDetailSelectors = {
  container: '.inventory_details_container',
  backButton: '[data-test="back-to-products"]',
  productName: '.inventory_details_container [data-test="inventory-item-name"]',
  productDescription: '.inventory_details_container [data-test="inventory-item-desc"]',
  productPrice: '.inventory_details_container [data-test="inventory-item-price"]',
  productImage: 'img.inventory_details_img',
} as const;
