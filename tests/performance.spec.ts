import { expect, test } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('temps de chargement de la page de connexion', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;
    console.log(`Login page load time: ${loadTime}ms`);

    expect(loadTime).toBeLessThan(5000);
  });

  test('vérification du titre de la page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/OrangeHRM/);
  });
});