import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT) || 30_000,
  EXPECT_TIMEOUT: Number(process.env.EXPECT_TIMEOUT) || 5_000,
  RETRIES: Number(process.env.RETRIES) || 1,
  WORKERS: Number(process.env.WORKERS) || 4,
  CI: process.env.CI === 'true',
} as const;
