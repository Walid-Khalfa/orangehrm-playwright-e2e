import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from './test-data';

test.describe.skip('Visual Regression Tests', () => {
  test('login page - default appearance', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('login page - with error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TestData.Users.INVALID_USER.username, TestData.Users.INVALID_USER.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveScreenshot('login-error-state.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});