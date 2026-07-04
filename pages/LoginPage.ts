import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly dashboardHeading: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder="Username"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForPageToLoad();
  }

  async waitForPageToLoad(): Promise<void> {
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginWithDefaultCredentials(): Promise<void> {
    const username = process.env.USERNAME || 'Admin';
    const password = process.env.PASSWORD || 'admin123';
    await this.login(username, password);
    await expect(this.dashboardHeading).toBeVisible({ timeout: 10000 });
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }
}