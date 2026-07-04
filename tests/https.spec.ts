import { expect, test } from '@playwright/test';

test('vérification HTTPS', async ({ page }) => {
  await page.goto('/');

  const url = new URL(page.url());

  expect(url.protocol).toBe('https:');
  await expect(page).toHaveURL(/^https:\/\//);
});