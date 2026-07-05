import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('OrangeHRM login', () => {
  test('connexion réussie', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await expect(loginPage.dashboardHeading).toBeVisible();
    await expect(page).toHaveURL(/\/dashboard\/index$/);
  });

  test('mot de passe incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'wrong-password');

    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
  });

  test('identifiants vides - redirection', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('bouton connexion toujours visible', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.loginButton).toBeVisible();
  });
});