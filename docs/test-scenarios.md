# Test Scenarios

## Summary

**Total: 38 tests** (9 smoke, 29 regression)

## Test Matrix

| ID | Module | Scenario | Tags |
|----|--------|----------|------|
| **Login** | | | |
| L-01 | Login | Login with standard_user, redirects to inventory | @smoke @auth |
| L-02 | Login | Locked out user shows locked error message | @smoke @auth |
| L-03 | Login | Invalid credentials show error | @regression @auth |
| L-04 | Login | Empty username shows "Username is required" | @regression @auth |
| L-05 | Login | Empty password shows "Password is required" | @regression @auth |
| L-06 | Login | Logout redirects to login page | @smoke @auth |
| **Inventory** | | | |
| I-01 | Inventory | Products displayed with name, description, price, image | @smoke @inventory |
| I-02 | Inventory | Default sort is A-Z | @regression @inventory |
| I-03 | Inventory | Sort Z-A reverses order | @regression @inventory |
| I-04 | Inventory | Sort price low to high | @regression @inventory |
| I-05 | Inventory | Sort price high to low | @regression @inventory |
| I-06 | Inventory | Click product name navigates to detail page | @regression @inventory |
| I-07 | Inventory | Add product to cart; button changes, badge appears | @smoke @inventory |
| I-08 | Inventory | Remove from cart restores button and updates badge | @regression @inventory |
| I-09 | Inventory | Add all 6 products updates cart badge to 6 | @regression @inventory |
| **Product Detail** | | | |
| PD-01 | Product | Detail page shows correct name, description, price, image | @regression @product |
| PD-02 | Product | Add to cart and remove from cart on detail page | @regression @product |
| PD-03 | Product | Back to products returns to inventory | @regression @product |
| **Cart** | | | |
| C-01 | Cart | Cart displays added items with matching details | @smoke @cart |
| C-02 | Cart | Remove item from cart | @regression @cart |
| C-03 | Cart | Continue Shopping returns to inventory | @regression @cart |
| C-04 | Cart | Cart items persist after navigating away and back | @regression @cart |
| C-05 | Cart | Add, remove, re-add same product works correctly | @regression @cart |
| **Checkout Info** | | | |
| CH-01 | Checkout | Valid checkout info proceeds to overview | @regression @checkout |
| CH-02 | Checkout | Missing first name shows error | @regression @checkout |
| CH-03 | Checkout | Missing last name shows error | @regression @checkout |
| CH-04 | Checkout | Missing postal code shows error | @regression @checkout |
| CH-05 | Checkout | Cancel returns to cart | @regression @checkout |
| **Checkout Overview** | | | |
| CO-01 | Overview | Displays correct items and quantities | @regression @checkout |
| CO-02 | Overview | Subtotal + tax = total (dynamic calculation) | @smoke @checkout |
| CO-03 | Overview | Finish completes order | @regression @checkout |
| **Checkout Complete** | | | |
| CC-01 | Complete | Shows confirmation header and text | @regression @checkout |
| CC-02 | Complete | Back Home returns to inventory | @regression @checkout |
| **E2E Journeys** | | | |
| E2E-01 | E2E | Single product full purchase flow | @smoke @e2e |
| E2E-02 | E2E | Multiple products full purchase flow | @regression @e2e |
| E2E-03 | E2E | Modify cart mid-flow and complete purchase | @regression @e2e |
| E2E-04 | E2E | Error user encounters checkout failure | @regression @e2e |
| **Auth Edge** | | | |
| AE-01 | Auth | Direct URL access without login redirects to login | @regression @auth |
