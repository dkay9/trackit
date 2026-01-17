import { test, expect } from '@playwright/test';

test.describe('Application Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/auth/login');
    await page.fill('input[type="email"]', 'daslimedkay@gmail.com');
    await page.fill('input[type="password"]', '112233');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('**/dashboard', { timeout: 45000 });
    await page.waitForLoadState('networkidle');
  });

  test('should display dashboard with applications', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('text=Total Applications')).toBeVisible();
    await expect(page.locator('text=Recent Applications')).toBeVisible();
  });

  test('should edit existing application', async ({ page }) => {
    const editButton = page.locator('button[title="Edit"]').first();
    await expect(editButton).toBeVisible({ timeout: 10000 });
    
    await editButton.click();
    await expect(page.locator('h2:has-text("Edit Application")')).toBeVisible();
    
    await page.selectOption('select[name="status"]', 'interview');
    await page.click('button:has-text("Save Changes")');
    
    await page.waitForTimeout(3000);
    await expect(page.locator('text=Recent Applications')).toBeVisible();
  });
});