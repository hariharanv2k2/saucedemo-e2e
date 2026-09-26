# SauceDemo E2E Test Framework

Playwright + TypeScript E2E testing framework for [SauceDemo](https://www.saucedemo.com/). Demonstrates senior-level QA automation: Page Object Model, custom fixtures, cross-browser testing, dynamic test data, and CI/CD.

## Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Install browsers
npx playwright install --with-deps

# Run all tests (Chromium)
npm run test:chromium

# Run smoke tests only
npm run test:smoke

# Run full regression (all browsers)
npm test
```

## Test Coverage

**38 tests** across 8 modules:

| Module | Tests | Tags |
|--------|-------|------|
| Login | 6 | @auth |
| Inventory | 9 | @inventory |
| Product Detail | 3 | @product |
| Cart | 5 | @cart |
| Checkout | 10 | @checkout |
| E2E Journeys | 4 | @e2e |
| Auth Edge | 1 | @auth |

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (all browsers) |
| `npm run test:smoke` | Smoke tests on Chromium |
| `npm run test:regression` | Regression tests on Chromium |
| `npm run test:chromium` | All tests on Chromium |
| `npm run test:firefox` | All tests on Firefox |
| `npm run test:webkit` | All tests on WebKit |
| `npm run test:report` | Open HTML report |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript type check |

## Reproducing Failures

Tests use seeded randomness. To reproduce a specific run:

```bash
# The seed is logged in the HTML report as a test annotation
TEST_SEED=12345 npx playwright test tests/cart/cart-management.spec.ts --project=chromium
```

## Architecture

- **Page Object Model** with composition (BasePage + Header/Menu components)
- **Separate selectors** in `src/selectors/` for maintainability
- **Custom fixtures** chain: pom -> auth -> base
- **2 flows** for genuine multi-page workflows (login, purchase)
- **Dynamic test data**: products from UI, faker for checkout info
- **Cross-browser**: Chromium, Firefox, WebKit with WebKit-specific timeout tuning

See [docs/architecture.md](docs/architecture.md) for detailed design decisions.

## CI/CD

GitHub Actions workflow (`.github/workflows/e2e-tests.yml`):
- **Smoke tests**: Run on every PR (Chromium only, ~2 min)
- **Regression tests**: Run on push to main + nightly (all 3 browsers)

## Documentation

- [Test Strategy](docs/test-strategy.md)
- [Test Scenarios](docs/test-scenarios.md)
- [Architecture](docs/architecture.md)
