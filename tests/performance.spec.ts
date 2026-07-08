import { expect, test } from '@playwright/test';
import { TestData } from './test-data';

test.describe('Performance Tests', () => {
  test('page load time', async ({ page }) => {
    await page.goto(TestData.URLs.BASE_URL);
    
    // Measure time to load the login form
    const startTime = Date.now();
    await page.waitForSelector('input[placeholder="Username"]');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('form interaction responsiveness', async ({ page }) => {
    await page.goto(TestData.URLs.BASE_URL);
    
    // Measure time to interact with form elements
    const startTime = Date.now();
    await page.fill('input[placeholder="Username"]', TestData.Users.VALID_USER.username);
    await page.fill('input[placeholder="Password"]', TestData.Users.VALID_USER.password);
    await page.click('button:has-text("Login")');
    const interactionTime = Date.now() - startTime;
    
    // Should respond within 3 seconds
    expect(interactionTime).toBeLessThan(3000);
  });

  test('vérification du titre de la page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/OrangeHRM/);
  });
});