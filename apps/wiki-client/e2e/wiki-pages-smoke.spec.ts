import { expect, test } from '@playwright/test';

test('hub shows game cards without wiki page nav', async ({ page }) => {
  await page.goto('./index.html');
  await expect(page.locator('.wiki-page-nav')).toHaveCount(0);
  await expect(page.getByTestId('card-pixel')).toBeVisible();
  await expect(page.getByTestId('card-labyrinth')).toBeVisible();
  await expect(page.getByTestId('card-spectrum')).toBeVisible();
  await expect(page.getByTestId('explorer')).toHaveCount(0);
});
