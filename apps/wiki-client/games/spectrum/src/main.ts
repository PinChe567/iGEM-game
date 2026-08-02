import '@suite/ui/tokens.css';
import '@suite/ui/shell.css';
import '@suite/ui/components.css';
import './styles.css';
import { mountShell, shellMain } from '../../../src/shell/mount';
import { t } from '../../../src/i18n/messages';
import { readStoredLocale } from '../../../src/i18n/locale';
import type { Locale } from '../../../src/i18n/locale';
import {
  parseSpectrumStoredJson,
  SPECTRUM_STORAGE_KEY,
} from '@suite/core/spectrum';
import { startSpectrumGame } from './game';

const app = document.querySelector<HTMLElement>('#app');
if (!app) throw new Error('#app missing');

const initialCopy = t(readStoredLocale());
let refreshReady: (() => void) | undefined;

const shell = mountShell(app, {
  homeHref: '../../index.html',
  actionsHtml: `
    <button class="ghost-button compact-label" id="guideButton" type="button">
      <span>?</span> ${initialCopy.spectrumShell.guide}
    </button>`,
  onLocaleChange: (_locale: Locale, copy) => {
    const guide = app.querySelector('#guideButton');
    if (guide) guide.innerHTML = `<span>?</span> ${copy.spectrumShell.guide}`;
    try {
      const stored = parseSpectrumStoredJson(localStorage.getItem(SPECTRUM_STORAGE_KEY));
      localStorage.setItem(
        SPECTRUM_STORAGE_KEY,
        JSON.stringify({ ...stored, locale: _locale }),
      );
    } catch {
      /* storage optional */
    }
    refreshReady?.();
  },
});

const main = shellMain(app);
main.innerHTML = `
  <section class="sp-intro-banner" aria-labelledby="sp-title">
    <div class="eyebrow"><span></span> GAME 03</div>
    <h1 id="sp-title">Scent <em>Spectrum</em></h1>
    <p data-sp-lead></p>
  </section>
  <section class="sp-lab" aria-label="Scent Spectrum">
    <div class="sp-lab-header">
      <div>
        <span class="section-label">混香解碼局</span>
        <h2 data-sp-heading></h2>
      </div>
      <div class="sp-lab-actions">
        <button class="text-button" id="scienceButton" type="button" data-sp-science></button>
        <button class="text-button" id="a11yButton" type="button" data-sp-a11y></button>
      </div>
    </div>
    <div class="level-tabs" id="modeTabs" role="tablist"></div>
    <div class="sp-card">
      <aside class="sp-panel" id="settingsPanel"></aside>
      <section class="sp-play" id="playArea" aria-live="polite"></section>
    </div>
  </section>
  <dialog id="scienceDialog" class="modal guide-modal">
    <div class="modal-header">
      <div>
        <span class="section-label">~30 SEC</span>
        <h2 data-science-title></h2>
      </div>
      <button class="close-button" data-close="scienceDialog" type="button" aria-label="Close">\u00d7</button>
    </div>
    <div data-science-body></div>
    <button class="primary-button full-button" data-close="scienceDialog" type="button" data-sp-close></button>
  </dialog>
  <dialog id="guideDialog" class="modal guide-modal">
    <div class="modal-header">
      <div>
        <span class="section-label">GUIDE</span>
        <h2 data-guide-title></h2>
      </div>
      <button class="close-button" data-close="guideDialog" type="button" aria-label="Close">\u00d7</button>
    </div>
    <div data-guide-body></div>
    <button class="primary-button full-button" data-close="guideDialog" type="button" data-sp-close></button>
  </dialog>
`;

startSpectrumGame({
  getCopy: () => shell.getCopy(),
  getLocale: () => shell.getLocale(),
  onReady: (api) => {
    refreshReady = api.refreshReady;
  },
});
