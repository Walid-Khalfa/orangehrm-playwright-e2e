import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from './test-data';

test.describe('OrangeHRM login', () => {
  test('successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TestData.Users.VALID_USER.username, TestData.Users.VALID_USER.password);

    await expect(loginPage.dashboardHeading).toBeVisible();
    await expect(page).toHaveURL(new RegExp(TestData.URLs.DASHBOARD_PAGE));
  });

  test('login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(TestData.Users.INVALID_USER.username, TestData.Users.INVALID_USER.password);

    await expect(loginPage.errorMessage).toHaveText(TestData.ExpectedText.ERROR_MESSAGE_INVALID_CREDENTIALS);
  });

  test('login button is always visible', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();
  });
});