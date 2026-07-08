import { expect, test } from '@playwright/test';
import { TestData } from './test-data';

test.describe('HTTPS Security Tests', () => {
  test('page uses HTTPS protocol', async ({ page }) => {
    await page.goto(TestData.URLs.BASE_URL);
    
    // Verify the page is loaded via HTTPS
    expect(page.url()).toContain('https://');
  });

  test('secure connection indicator present', async ({ page }) => {
    await page.goto(TestData.URLs.BASE_URL);
    
    // Check if the connection is secure (lock icon in browser)
    // Note: This is more of a visual check that would require visual testing
    // For now, we verify the protocol
    expect(page.url()).toContain('https://');
  });
});