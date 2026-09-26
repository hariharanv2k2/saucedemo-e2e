import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/config/env.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: ENV.CI,
  retries: ENV.CI ? 2 : ENV.RETRIES,
  workers: ENV.CI ? 2 : ENV.WORKERS,
  timeout: ENV.DEFAULT_TIMEOUT,

  expect: {
    timeout: ENV.EXPECT_TIMEOUT,
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    baseURL: ENV.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        actionTimeout: 15_000,
        navigationTimeout: 20_000,
      },
      timeout: 60_000,
    },
  ],
});
