import { expect, test } from '@playwright/test';
import {
  buildPracticeSpectrumSession,
  canonicalizeMixture,
  scoreAB,
} from '@suite/core/spectrum';
import {
  SPECTRUM_CONTENT_VERSION,
  SPECTRUM_ODOR_IDS,
  signatureMap,
} from '@suite/content';

const FIXED_SEED = 'e2e-spectrum-seed-001';
const SIGS = signatureMap();
const ALL_IDS = [...SPECTRUM_ODOR_IDS];

async function resetSpectrum(page: import('@playwright/test').Page) {
  await page.goto('./games/spectrum/index.html');
  await page.evaluate(() => localStorage.removeItem('suite.spectrum.v1'));
  await page.reload();
  await expect(page.getByTestId('ready')).toBeVisible();
}

async function startEasyPractice(
  page: import('@playwright/test').Page,
  seed = FIXED_SEED,
) {
  await page.getByTestId('difficulty').selectOption('easy');
  await page.getByTestId('seed').fill(seed);
  await page.getByTestId('start').click();
}

async function completeOrSkipTutorial(page: import('@playwright/test').Page) {
  const tut = page.getByTestId('tutorial');
  if (await tut.isVisible().catch(() => false)) {
    for (let i = 0; i < 3; i += 1) {
      await expect(page.getByTestId('tutorial')).toHaveAttribute(
        'data-tutorial-step',
        String(i),
      );
      await page.getByTestId('tut-next').click();
    }
  }
  await expect(page.getByTestId('play')).toBeVisible();
}

/** Build a guess by setting percents (0% = unused). */
async function setGuess(
  page: import('@playwright/test').Page,
  parts: Array<{ odorId: string; percent: number }>,
) {
  // Zero every visible percent control first
  const nums = page.locator('[data-num]');
  const n = await nums.count();
  for (let i = 0; i < n; i += 1) {
    const input = nums.nth(i);
    await input.fill('0');
    await input.blur();
  }
  for (const part of parts) {
    await page.getByTestId(`percent-${part.odorId}`).fill(String(part.percent));
    await page.getByTestId(`percent-${part.odorId}`).blur();
  }
}

test.describe('Scent Spectrum wiki', () => {
  test('tutorial, pool A/B, history, solve, fail, locale, mobile, keyboard', async ({
    page,
  }) => {
    const session = buildPracticeSpectrumSession({
      difficulty: 'easy',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
      seed: FIXED_SEED,
    });
    const truth = session.puzzle.truth;
    expect(truth.components.length).toBeGreaterThanOrEqual(2);
    expect(session.puzzle.poolIds).toHaveLength(6);

    const swapped = canonicalizeMixture(
      truth.components.length === 2
        ? [
            {
              odorId: truth.components[0]!.odorId,
              percent: truth.components[1]!.percent,
            },
            {
              odorId: truth.components[1]!.odorId,
              percent: truth.components[0]!.percent,
            },
          ]
        : truth.components.map((c, i) => ({
            odorId: c.odorId,
            percent:
              truth.components[(i + 1) % truth.components.length]!.percent,
          })),
    );
    // When only concentrations are swapped among the same odors: 0A2B for 2-comp truth.
    if (truth.components.length === 2) {
      expect(scoreAB(swapped, truth, session.puzzle.poolIds)).toEqual({
        a: 0,
        b: 2,
      });
    }

    await resetSpectrum(page);

    await page.locator('.lang-switch [data-locale="en"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByTestId('start')).toContainText(/Start practice/i);

    await page.locator('.lang-switch [data-locale="zh-Hant"]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hant');

    await startEasyPractice(page);
    await completeOrSkipTutorial(page);
    await expect(page.getByTestId('mix-count')).toBeVisible();

    if (truth.components.length === 2) {
      await setGuess(
        page,
        swapped.components.map((c) => ({ ...c })),
      );
      await expect(page.getByTestId('sum')).toHaveText('100');
      await page.getByTestId('submit').click();
      await expect(page.getByTestId('ab-result')).toContainText('0A2B');
      await page.getByTestId('toggle-history').click();
      await expect(page.getByTestId('history')).toContainText('0A2B');
    }

    await setGuess(
      page,
      truth.components.map((c) => ({ ...c })),
    );
    await page.getByTestId('submit').click();
    await expect(page.getByTestId('result')).toHaveAttribute('data-solved', 'true');
    await expect(page.getByTestId('truth')).toBeVisible();

    // Failure reveal
    await page.getByTestId('to-setup').click();
    await page.evaluate(() => {
      const raw = localStorage.getItem('suite.spectrum.v1');
      if (!raw) return;
      const data = JSON.parse(raw);
      data.tutorialSeen = true;
      localStorage.setItem('suite.spectrum.v1', JSON.stringify(data));
    });

    const failSeed = 'e2e-spectrum-fail-002';
    const failSession = buildPracticeSpectrumSession({
      difficulty: 'easy',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
      seed: failSeed,
    });
    const wrongPool = ALL_IDS.filter(
      (id) => !failSession.puzzle.truth.components.some((c) => c.odorId === id),
    );
    const wrong = canonicalizeMixture([
      { odorId: wrongPool[0]!, percent: 60 },
      { odorId: wrongPool[1]!, percent: 40 },
    ]);

    await startEasyPractice(page, failSeed);
    await expect(page.getByTestId('play')).toBeVisible();

    for (let i = 0; i < 8; i += 1) {
      await setGuess(
        page,
        wrong.components.map((c) => ({ ...c })),
      );
      await page.getByTestId('submit').click();
    }
    await expect(page.getByTestId('result')).toHaveAttribute('data-solved', 'false');
    await expect(page.getByTestId('truth')).toBeVisible();

    // Mobile history
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByTestId('to-setup').click();
    await startEasyPractice(page, FIXED_SEED);
    await expect(page.getByTestId('play')).toBeVisible();
    await setGuess(
      page,
      truth.components.map((c) => ({ ...c })),
    );
    await page.getByTestId('submit').click();
    await expect(page.getByTestId('result')).toBeVisible();

    // Keyboard-only
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.getByTestId('to-setup').click();
    await page.getByTestId('seed').fill(FIXED_SEED);
    await page.getByTestId('start').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('play')).toBeVisible();
    await setGuess(
      page,
      truth.components.map((c) => ({ ...c })),
    );
    await page.getByTestId('submit').focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('result')).toHaveAttribute('data-solved', 'true');
  });
});
