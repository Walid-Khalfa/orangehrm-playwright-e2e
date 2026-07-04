import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('OrangeHRM Accessibility', () => {
  test('page de connexion accessible', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['region', 'landmark-one-main'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('formulaire accessible aux lecteurs d\'écran', async ({ page }) => {
    await page.goto('/');

    const usernameInput = page.locator('input[placeholder="Username"]');
    const passwordInput = page.locator('input[placeholder="Password"]');

    await expect(usernameInput).toHaveAttribute('aria-label', /username/i);
    await expect(passwordInput).toHaveAttribute('aria-label', /password/i);
  });
});