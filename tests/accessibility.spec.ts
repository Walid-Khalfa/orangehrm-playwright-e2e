import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { TestData } from './test-data';

test.describe('OrangeHRM Accessibility', () => {
  test('login page - basic scan', async ({ page }) => {
    await page.goto(TestData.URLs.BASE_URL);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical'
    );
    expect(criticalViolations).toHaveLength(0);
  });

  test('form - visible elements', async ({ page }) => {
    await page.goto(TestData.URLs.BASE_URL);

    await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: TestData.ExpectedText.LOGIN_BUTTON })).toBeVisible();
  });
});