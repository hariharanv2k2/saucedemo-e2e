import { test, expect } from '../../src/fixtures/base.fixture';
import { USERS, INVALID_USER } from '../../src/data/users.data';

test.describe('Login - Negative Scenarios', { tag: ['@auth'] }, () => {
  test('L-02: should show error for locked out user', { tag: ['@smoke'] }, async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.locked_out.username, USERS.locked_out.password);

    await expect(loginPage.page.locator('[data-test="error"]')).toContainText(
      'Sorry, this user has been locked out',
    );
  });

  test('L-03: should show error for invalid credentials', { tag: ['@regression'] }, async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error).toContain('Username and password do not match');
  });

  test('L-04: should show error for empty username', { tag: ['@regression'] }, async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('L-05: should show error for empty password', { tag: ['@regression'] }, async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });

  test('AE-01: should redirect to login when accessing inventory without auth', {
    tag: ['@regression'],
  }, async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/saucedemo\.com\/$/);
    await expect(page.locator('[data-test="error"]')).toContainText(
      "You can only access '/inventory.html' when you are logged in",
    );
  });
});
