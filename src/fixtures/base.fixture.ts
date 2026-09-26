import { test } from './auth.fixture';
import { getTestSeed } from '../utils/random.utils';

export { expect } from '@playwright/test';

// eslint-disable-next-line no-empty-pattern
test.beforeEach(async ({}, testInfo) => {
  const seed = getTestSeed();
  testInfo.annotations.push({ type: 'seed', description: String(seed) });
});

export { test };
