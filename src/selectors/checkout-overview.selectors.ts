export const CheckoutOverviewSelectors = {
  cartItem: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  itemPrice: '[data-test="inventory-item-price"]',
  itemQuantity: '[data-test="item-quantity"]',
  subtotalLabel: '[data-test="subtotal-label"]',
  taxLabel: '[data-test="tax-label"]',
  totalLabel: '[data-test="total-label"]',
  finishButton: '[data-test="finish"]',
  cancelButton: '[data-test="cancel"]',
} as const;
