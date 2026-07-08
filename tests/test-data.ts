/**
 * Test data helper for OrangeHRM automation tests
 * Centralizes test data to avoid hardcoding values in test files
 */

export const TestData = {
  // User credentials
  Users: {
    VALID_USER: {
      username: process.env.USERNAME || 'Admin',
      password: process.env.PASSWORD || 'admin123'
    },
    INVALID_USER: {
      username: 'Admin',
      password: 'wrong-password'
    },
    LOCKED_USER: {
      username: 'Admin',
      password: 'wrong-password'
    }
  },

  // URLs
  URLs: {
    BASE_URL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
    LOGIN_PAGE: '/',
    DASHBOARD_PAGE: '/dashboard/index'
  },

  // Expected texts
  ExpectedText: {
    LOGIN_BUTTON: 'Login',
    FORGOT_PASSWORD_LINK: 'Forgot your password?',
    ERROR_MESSAGE_INVALID_CREDENTIALS: 'Invalid credentials',
    DASHBOARD_HEADING: 'Dashboard'
  },

  // Timeouts
  Timeouts: {
    PAGE_LOAD: 10000,
    ELEMENT_VISIBLE: 5000,
    ACTION_COMPLETION: 3000
  }
};

// Helper functions
export const TestHelpers = {
  /**
   * Get random string for generating unique test data
   * @param length Length of the random string
   * @returns Random string
   */
  getRandomString: (length = 8) => {
    return Math.random().toString(36).substring(2, 2 + length);
  },

  /**
   * Generate a random email for testing
   * @returns Random email string
   */
  getRandomEmail: () => {
    return `test.${TestHelpers.getRandomString()}@example.com`;
  },

  /**
   * Wait for a specific amount of time
   * @param ms Milliseconds to wait
   * @returns Promise that resolves after the specified time
   */
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};