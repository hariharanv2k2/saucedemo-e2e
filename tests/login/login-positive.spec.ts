import { test, expect } from '../../src/fixtures/base.fixture';
import { USERS } from '../../src/data/users.data';
import { loginAs } from '../../src/flows/login.flow';

test.describe('Login - Positive Scenarios', { tag: ['@smoke', '@auth'] }, () => {
  test('L-01: should login with standard_user and redirect to inventory', async ({
    loginPage,
    page,
  }) => {
    await loginAs(loginPage, USERS.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('L-06: should logout and redirect to login page', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginAs(loginPage, USERS.standard);
    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.header.openMenu();
    await inventoryPage.menu.logout();

    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
