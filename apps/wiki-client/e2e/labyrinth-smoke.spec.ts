import { expect, test } from '@playwright/test';

test.describe('Labyrinth wiki solo smoke', () => {
  test('tutorial skip, start case, keyboard task, review board', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('./games/labyrinth/index.html');

    // Tutorial or menu
    if (await page.locator('[data-phase="tutorial"]').count()) {
      await page.locator('[data-skip]').click();
    }
    await expect(page.locator('[data-phase="menu"]')).toBeVisible();

    await page.locator('[data-science]').click();
    await expect(page.locator('[data-science-dialog]')).toBeVisible();
    await page.locator('[data-close-science]').first().click();

    await page.locator('[data-seed]').fill('e2e-solo-seed-001');
    await page.locator('[data-start]').click();
    await expect(page.locator('[data-phase="briefing"]')).toBeVisible();
    await page.locator('[data-go]').click();
    await expect(page.locator('[data-lx-canvas]')).toBeVisible();

    await page.locator('[data-lx-canvas]').focus();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-pause-overlay]')).toBeVisible();
    await page.locator('[data-resume]').click();
    await expect(page.locator('[data-lx-stage]')).toHaveAttribute('data-paused', 'false', {
      timeout: 8_000,
    });

    await page.locator('[data-task]').click();
    await expect(page.locator('[data-task-panel]')).toBeVisible();
    // Abort is keyboard-focusable; ensure panel exists then abort
    await page.locator('[data-abort]').click();

    await page.locator('[data-advance]').click();
    await expect(page.locator('[data-phase="review1"]')).toBeVisible();
    await expect(page.locator('[data-solution-hint]')).toBeVisible();
    // Partial evidence should not claim uniqueness falsely if multiple remain —
    // just ensure hint text is present.
    await page.locator('[data-board-phantom]').selectOption({ index: 1 });
    await page.locator('[data-continue]').click();
    await expect(page.locator('[data-phase="explore2"]')).toBeVisible();
  });

  test('hub links to labyrinth solo', async ({ page }) => {
    await page.goto('./index.html');
    await page.locator('a[data-game="labyrinth"]').click();
    await expect(page.locator('.lx-shell')).toBeVisible();
  });
});
