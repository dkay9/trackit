import { test, expect } from '@playwright/test';

test.describe('Dashboard Stats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'daslimedkay@gmail.com');
    await page.fill('input[type="password"]', '112233');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard', { timeout: 45000 });
    await page.waitForLoadState('networkidle');
  });

  test('should display all stat cards', async ({ page }) => {
    await expect(page.locator('text=Total Applications')).toBeVisible();
    await expect(page.locator('text=Interviews')).toBeVisible();
    await expect(page.locator('text=Offers')).toBeVisible();
    await expect(page.locator('text=Response Rate')).toBeVisible();
  });

  test('should show welcome message', async ({ page }) => {
    await expect(page.locator('text=Welcome back')).toBeVisible();
    await expect(page.locator('text=David').first()).toBeVisible();
  });
});