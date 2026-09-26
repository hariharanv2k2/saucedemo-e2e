# Architecture

## Project Structure

```
saucedemo-e2e/
├── src/
│   ├── config/env.config.ts          # Environment config (dotenv)
│   ├── data/
│   │   ├── users.data.ts             # Static user accounts
│   │   └── checkout.data.ts          # Faker-generated checkout data
│   ├── fixtures/
│   │   ├── pom.fixture.ts            # Page object instances
│   │   ├── auth.fixture.ts           # Opt-in login fixture
│   │   └── base.fixture.ts           # Re-exports test + expect
│   ├── flows/
│   │   ├── login.flow.ts             # Login multi-step flow
│   │   └── purchase.flow.ts          # Full purchase flow (5 pages)
│   ├── pages/
│   │   ├── components/
│   │   │   ├── header.component.ts   # Cart badge, menu, title
│   │   │   └── menu.component.ts     # Sidebar navigation
│   │   ├── base.page.ts              # Composition: header + menu
│   │   ├── login.page.ts             # Standalone (no header/menu)
│   │   ├── inventory.page.ts
│   │   ├── product-detail.page.ts
│   │   ├── cart.page.ts
│   │   ├── checkout-info.page.ts
│   │   ├── checkout-overview.page.ts
│   │   └── checkout-complete.page.ts
│   ├── selectors/                    # Centralized selector constants
│   │   ├── header.selectors.ts
│   │   ├── menu.selectors.ts
│   │   ├── login.selectors.ts
│   │   ├── inventory.selectors.ts
│   │   ├── product-detail.selectors.ts
│   │   ├── cart.selectors.ts
│   │   ├── checkout-info.selectors.ts
│   │   ├── checkout-overview.selectors.ts
│   │   └── checkout-complete.selectors.ts
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── product.types.ts
│   │   ├── checkout.types.ts
│   │   └── index.ts
│   └── utils/
│       ├── price.utils.ts            # Parse "$29.99" -> 29.99
│       └── random.utils.ts           # Seeded PRNG + pickRandom
├── tests/
│   ├── login/
│   ├── inventory/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   └── e2e/
├── .github/workflows/e2e-tests.yml
├── playwright.config.ts
└── tsconfig.json
```

## Design Decisions

### Page Object Model

- **Composition over inheritance**: `BasePage` composes `HeaderComponent` + `MenuComponent`
- **LoginPage is standalone**: No header/menu on login page (LSP compliance)
- **No assertions in POMs**: POMs expose data and actions; tests make assertions
- **Selectors separated**: Centralized in `src/selectors/` for maintainability

### Fixture Chain

```
pom.fixture (creates 7 page objects)
  └── auth.fixture (opt-in login via authenticatedPage)
      └── base.fixture (re-exports test/expect, adds seed annotation)
```

- `authenticatedPage` is opt-in (`auto: false`) - tests destructure it to trigger login
- Login tests skip auth fixture entirely
- Auth fixture delegates to `loginAs()` flow (single login implementation)

### Flows (2 only)

1. **login.flow.ts**: goto + fill credentials + submit (used by fixture and tests)
2. **purchase.flow.ts**: add items + cart + checkout info + overview + finish (spans 5 pages)

Single-page interactions are NOT flows - they're POM methods.

### Cross-Browser Stability

WebKit on Windows requires special handling:
- **`waitForURL()`** after every navigation (SPA route changes)
- **`waitFor()` on page-specific elements** before `allTextContents()` / `.count()` (these don't auto-wait)
- **`waitFor({ state: 'visible' })`** on sidebar menu links (animation delay)
- **Extended timeouts** for WebKit project (60s test, 15s action, 20s navigation)

### Test Data

- **No static product catalogue**: Products read from UI at runtime
- **Reproducible randomness**: mulberry32 PRNG + `TEST_SEED` env var
- **Dynamic verification**: Sort order and price calculations derived from displayed values
