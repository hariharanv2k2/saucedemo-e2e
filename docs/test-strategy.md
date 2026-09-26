# Test Strategy

## Scope

End-to-end UI testing of [SauceDemo](https://www.saucedemo.com/), a React-based e-commerce demo application. Tests cover the full user journey from login through checkout completion.

## Test Levels

| Level | Description | Tag | When |
|-------|-------------|-----|------|
| Smoke | Critical happy-path flows | `@smoke` | Every PR, every push to main |
| Regression | Full functional coverage | `@regression` | Push to main, nightly schedule |

## Browser Coverage

- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **WebKit** (Desktop Safari)

All 38 tests run across all 3 browsers. WebKit has extended timeouts (60s test / 15s action) due to slower rendering on Windows.

## Test Data Strategy

| Category | Approach |
|----------|----------|
| User credentials | Static constants (app-provided accounts) |
| Products | Read dynamically from the UI at runtime |
| Checkout info | Generated via `@faker-js/faker` with seeded PRNG |
| Sort verification | Read from UI, sort programmatically, compare |
| Price verification | Read from UI, compute expected totals dynamically |

### Reproducible Randomness

- Seeded PRNG (mulberry32) ensures deterministic product selection
- `@faker-js/faker` seeded for checkout data generation
- `TEST_SEED` env var reproduces any previous run
- Seed is logged as a test annotation in reports

## Retry & Failure Strategy

| Setting | Local | CI |
|---------|-------|----|
| Retries | 0 | 2 |
| Workers | 4 | 2 |
| Screenshots | On failure | On failure |
| Video | Retain on failure | Retain on failure |
| Trace | On first retry | On first retry |

## Risk Areas

- **WebKit navigation timing**: SPA navigation in WebKit is slower; mitigated with explicit `waitForURL()` and cart-specific element waits
- **Sidebar animation**: Menu slide-in animation can cause flaky clicks; mitigated with `waitFor({ state: 'visible' })` before menu link clicks
- **`allTextContents()` race**: This Playwright method doesn't auto-wait; mitigated by waiting for page-specific elements before calling it
