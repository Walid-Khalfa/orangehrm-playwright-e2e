import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe.configure({ mode: 'skip' });

test.describe('Visual Regression Tests', () => {
  test('page de connexion - apparence par défaut', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('page de connexion - avec erreur', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid', 'credentials');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveScreenshot('login-error-state.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});