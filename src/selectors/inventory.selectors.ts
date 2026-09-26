export const InventorySelectors = {
  sortDropdown: '[data-test="product-sort-container"]',
  inventoryItem: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemDescription: '[data-test="inventory-item-desc"]',
  itemPrice: '[data-test="inventory-item-price"]',
  itemImage: 'img.inventory_item_img',
  addToCartButton: '.btn_inventory',
} as const;
