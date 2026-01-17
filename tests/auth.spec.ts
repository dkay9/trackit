import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should login existing user', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
    
    await page.fill('input[type="email"]', 'daslimedkay@gmail.com');
    await page.fill('input[type="password"]', '112233');
    
    await page.click('button:has-text("Sign In")');
    
    // Wait for dashboard with longer timeout
    await page.waitForURL('**/dashboard', { timeout: 45000 });
    
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'daslimedkay@gmail.com');
    await page.fill('input[type="password"]', '112233');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard', { timeout: 45000 });
    
    // Logout
    await page.click('text=Sign Out');
    await expect(page).toHaveURL(/login/);
  });
});