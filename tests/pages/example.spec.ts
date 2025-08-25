import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://stepik.org/catalog');
  await expect(page.getByRole('button', { name: 'Profile' })).toBeVisible();
});
