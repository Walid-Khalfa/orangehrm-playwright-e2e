import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('OrangeHRM Accessibility', () => {
  test('page de connexion - scan basique', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('formulaire - éléments visibles', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });
});