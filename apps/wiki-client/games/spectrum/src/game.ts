import {
  SPECTRUM_CONTENT_VERSION,
  SPECTRUM_ODOR_IDS,
  getSpectrumOdor,
  signatureMap,
  spectrumContentCatalog,
} from '@suite/content';
import {
  SPECTRUM_RULE_VERSION,
  SPECTRUM_STORAGE_KEY,
  buildDailySpectrumSession,
  buildPracticeSpectrumSession,
  canonicalizeMixture,
  computeSignals,
  computeSpectrumScore,
  createPracticeSeed,
  formatElapsed,
  getPreset,
  linearMix,
  mixturesEqual,
  parseSpectrumStoredJson,
  recordSpectrumBestScore,
  recordSpectrumPlayedSeed,
  scoreAB,
  signalFitScore,
  validateMixture,
  isPerfectAB,
  enumerateLegalMixtures,
  filterCandidates,
  type CanonicalMixture,
  type DifficultyId,
  type MixtureComponent,
  type SpectrumSession,
  type SpectrumSessionMode,
  type SpectrumStoredState,
} from '@suite/core/spectrum';
import type { Locale } from '../../../src/i18n/locale';
import type { MessageTree } from '../../../src/i18n/messages';
import { channelSummaryText, drawChannelChart, drawSignatureHint } from './chart';
import {
  loadSuiteExplorer,
  markScienceCard,
  saveSuiteExplorer,
} from '../../../src/progress/explorer';

const SIGS = signatureMap();
const ALL_IDS = [...SPECTRUM_ODOR_IDS];

type GuessHistoryRow = {
  index: number;
  guess: CanonicalMixture;
  a: number;
  b: number;
  fit: number;
  guessSignal: number[];
};

type GameOptions = {
  getCopy: () => MessageTree;
  getLocale: () => Locale;
  onReady?: (api: { refreshReady: () => void }) => void;
};

function loadStore(): SpectrumStoredState {
  try {
    return parseSpectrumStoredJson(localStorage.getItem(SPECTRUM_STORAGE_KEY));
  } catch {
    return parseSpectrumStoredJson(null);
  }
}

function saveStore(state: SpectrumStoredState): void {
  try {
    localStorage.setItem(SPECTRUM_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function odorName(id: string, locale: Locale): string {
  const rec = getSpectrumOdor(id);
  if (!rec) return id;
  return rec.name[locale];
}

function formatMixtureLabel(m: CanonicalMixture, locale: Locale): string {
  return m.components
    .map((c) => `${odorName(c.odorId, locale)} ${c.percent}%`)
    .join(' + ');
}

export function startSpectrumGame(options: GameOptions): void {
  const playAreaEl = document.querySelector<HTMLElement>('#playArea');
  const settingsPanelEl = document.querySelector<HTMLElement>('#settingsPanel');
  const modeTabsEl = document.querySelector<HTMLElement>('#modeTabs');
  if (!playAreaEl || !settingsPanelEl || !modeTabsEl) throw new Error('spectrum DOM missing');
  const playArea = playAreaEl;
  const settingsPanel = settingsPanelEl;
  const modeTabs = modeTabsEl;

  let store = loadStore();
  let mode: SpectrumSessionMode = 'practice';
  let difficulty: DifficultyId = 'easy';
  let practiceSeed = createPracticeSeed();
  let session: SpectrumSession | null = null;
  let history: GuessHistoryRow[] = [];
  let startedAt = 0;
  let phase: 'ready' | 'tutorial' | 'play' | 'result' = 'ready';
  let tutorialStep = 0;
  /** One row per pool odor; unselected ⇒ 0% in the guess. */
  let builderRows: Array<{ odorId: string; selected: boolean; percent: number }> = [];
  let legalCandidates: CanonicalMixture[] = [];
  let survivingCandidates: CanonicalMixture[] = [];
  let survivingOdorIds: Set<string> = new Set();
  let autofillNotice = '';
  let lastFeedback: GuessHistoryRow | null = null;
  let historyExpanded = false;

  applyA11y(store);

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.close;
      const dlg = id ? document.querySelector<HTMLDialogElement>(`#${id}`) : null;
      dlg?.close();
    });
  });

  document.querySelector('#scienceButton')?.addEventListener('click', () => {
    saveSuiteExplorer(markScienceCard(loadSuiteExplorer(), 'spectrum'));
    paintScience();
    document.querySelector<HTMLDialogElement>('#scienceDialog')?.showModal();
  });
  document.querySelector('#guideButton')?.addEventListener('click', () => {
    paintGuide();
    document.querySelector<HTMLDialogElement>('#guideDialog')?.showModal();
  });
  document.querySelector('#a11yButton')?.addEventListener('click', () => {
    store = {
      ...store,
      highContrast: !store.highContrast,
    };
    saveStore(store);
    applyA11y(store);
    refreshChrome();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('dialog[open]').forEach((d) => (d as HTMLDialogElement).close());
    }
  });

  function copy() {
    return options.getCopy().spectrum;
  }

  function locale() {
    return options.getLocale();
  }

  function refreshChrome(): void {
    const c = copy();
    const lead = document.querySelector('[data-sp-lead]');
    const heading = document.querySelector('[data-sp-heading]');
    const science = document.querySelector('[data-sp-science]');
    const a11y = document.querySelector('[data-sp-a11y]');
    if (lead) lead.textContent = c.lead;
    if (heading) heading.textContent = c.chooseRun;
    if (science) science.textContent = c.science;
    if (a11y) {
      a11y.textContent = store.highContrast ? c.contrastOn : c.contrastOff;
    }
    document.querySelectorAll('[data-sp-close]').forEach((el) => {
      el.textContent = c.close;
    });
  }

  function paintScience(): void {
    const c = copy();
    const title = document.querySelector('[data-science-title]');
    const body = document.querySelector('[data-science-body]');
    if (title) title.textContent = c.scienceTitle;
    if (body) {
      body.innerHTML = `<p>${c.scienceBody}</p><p class="sp-disclaimer">${spectrumContentCatalog.modelDisclaimer[locale()]}</p>`;
    }
  }

  function paintGuide(): void {
    const c = copy();
    const title = document.querySelector('[data-guide-title]');
    const body = document.querySelector('[data-guide-body]');
    if (title) title.textContent = c.guideTitle;
    if (body) {
      body.innerHTML = `<ol class="sp-guide-list"><li>${c.guide1}</li><li>${c.guide2}</li><li>${c.guide3}</li></ol><p>${c.axisNote}</p>`;
    }
  }

  function applyA11y(s: SpectrumStoredState): void {
    document.documentElement.classList.toggle('high-contrast', s.highContrast);
    document.documentElement.classList.toggle('reduced-motion', s.reducedMotion);
    const preferReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (preferReduce) document.documentElement.classList.add('reduced-motion');
  }

  function paintModes(): void {
    const c = copy();
    modeTabs.innerHTML = `
      <button type="button" role="tab" class="level-tab${mode === 'practice' ? ' active' : ''}" data-mode="practice" aria-selected="${mode === 'practice'}">${c.practice}</button>
      <button type="button" role="tab" class="level-tab${mode === 'daily' ? ' active' : ''}" data-mode="daily" aria-selected="${mode === 'daily'}">${c.daily}</button>
    `;
    modeTabs.querySelectorAll('[data-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        mode = (btn as HTMLElement).dataset.mode as SpectrumSessionMode;
        paintModes();
        paintSettings();
        if (phase === 'ready') paintReady();
      });
    });
  }

  function paintSettings(): void {
    const c = copy();
    const best = store.bestByScoreKey[`${difficulty}|${SPECTRUM_RULE_VERSION}`] ?? 0;
    settingsPanel.innerHTML = `
      <h3>${c.settings}</h3>
      <label class="sp-field">${c.difficulty}
        <select id="difficultySelect" data-testid="difficulty">
          <option value="easy"${difficulty === 'easy' ? ' selected' : ''}>${c.diffEasy}</option>
          <option value="hard"${difficulty === 'hard' ? ' selected' : ''}>${c.diffHard}</option>
        </select>
      </label>
      <p class="sp-muted">${difficulty === 'easy' ? c.diffEasyHint : c.diffHardHint}</p>
      ${
        mode === 'practice'
          ? `<label class="sp-field">${c.seed}
              <input id="seedInput" data-testid="seed" type="text" value="${practiceSeed}" />
            </label>
            <button type="button" class="text-button" id="randomSeed">${c.randomizeSeed}</button>`
          : `<p class="sp-daily-note" data-testid="daily-note">${c.dailyNote}</p>`
      }
      <p class="sp-best">${c.best}: <strong data-testid="best-score">${best}</strong>
        <span class="sp-muted">(${c.scoreScope})</span></p>
      <label class="sp-check">
        <input type="checkbox" id="reducedMotion" ${store.reducedMotion ? 'checked' : ''} />
        ${c.reducedMotion}
      </label>
      <button type="button" class="text-button" id="clearData">${c.clearData}</button>
      <button type="button" class="text-button" id="replayTutorialBtn">${c.replayTutorial}</button>
    `;

    settingsPanel.querySelector('#difficultySelect')?.addEventListener('change', (e) => {
      difficulty = (e.target as HTMLSelectElement).value as DifficultyId;
      paintSettings();
      if (phase === 'ready') paintReady();
    });
    settingsPanel.querySelector('#seedInput')?.addEventListener('change', (e) => {
      practiceSeed = (e.target as HTMLInputElement).value.trim() || createPracticeSeed();
    });
    settingsPanel.querySelector('#randomSeed')?.addEventListener('click', () => {
      practiceSeed = createPracticeSeed();
      paintSettings();
    });
    settingsPanel.querySelector('#reducedMotion')?.addEventListener('change', (e) => {
      store = { ...store, reducedMotion: (e.target as HTMLInputElement).checked };
      saveStore(store);
      applyA11y(store);
    });
    settingsPanel.querySelector('#clearData')?.addEventListener('click', () => {
      store = parseSpectrumStoredJson(null);
      saveStore(store);
      paintSettings();
    });
    settingsPanel.querySelector('#replayTutorialBtn')?.addEventListener('click', () => {
      store = { ...store, tutorialSeen: false };
      saveStore(store);
      startTutorial();
    });
  }

  function paintReady(): void {
    phase = 'ready';
    const c = copy();
    const preset = getPreset(difficulty);
    playArea.innerHTML = `
      <div class="ready-state" data-testid="ready">
        <p>${c.readyLead}</p>
        <ul class="sp-preset-facts">
          <li>${c.factOdors}: ${preset.odorCount}</li>
          <li>${c.factComponents}: ${preset.componentCountMin}${preset.componentCountMin !== preset.componentCountMax ? `\u2013${preset.componentCountMax}` : ''}</li>
          <li>${c.factStep}: ${preset.percentStep}%</li>
          <li>${c.factGuesses}: ${preset.maxGuesses}</li>
          <li>${c.factModel}: ${preset.mixingModel}</li>
        </ul>
        <button type="button" class="primary-button" id="start" data-testid="start">${mode === 'daily' ? c.startDaily : c.startPractice}</button>
      </div>
    `;
    playArea.querySelector('#start')?.addEventListener('click', onStart);
  }

  function onStart(): void {
    const seedInput = document.querySelector<HTMLInputElement>('#seedInput');
    if (mode === 'practice' && seedInput) {
      practiceSeed = seedInput.value.trim() || createPracticeSeed();
    }
    session =
      mode === 'daily'
        ? buildDailySpectrumSession({
            difficulty,
            signatures: SIGS,
            odorIds: ALL_IDS,
            contentVersion: SPECTRUM_CONTENT_VERSION,
          })
        : buildPracticeSpectrumSession({
            difficulty,
            signatures: SIGS,
            odorIds: ALL_IDS,
            contentVersion: SPECTRUM_CONTENT_VERSION,
            seed: practiceSeed,
          });
    store = recordSpectrumPlayedSeed(store, session.meta.seed);
    saveStore(store);
    history = [];
    lastFeedback = null;
    historyExpanded = false;
    startedAt = Date.now();
    legalCandidates = [];
    resetBuilder(session.puzzle.poolIds);
    refreshCandidates();
    if (!store.tutorialSeen) startTutorial();
    else startPlay();
  }

  function resetBuilder(poolIds?: readonly string[]): void {
    const ids = poolIds ?? session?.puzzle.poolIds ?? ALL_IDS.slice(0, getPreset(difficulty).odorCount);
    builderRows = ids.map((odorId, i) => ({
      odorId,
      selected: i < 2,
      percent: i === 0 ? 60 : i === 1 ? 40 : 0,
    }));
    autofillNotice = '';
  }

  function selectedComponents(): MixtureComponent[] {
    return builderRows
      .filter((r) => r.percent > 0)
      .map((r) => ({ odorId: r.odorId, percent: r.percent }));
  }

  function refreshCandidates(): void {
    if (!session) {
      legalCandidates = [];
      survivingCandidates = [];
      survivingOdorIds = new Set();
      return;
    }
    if (legalCandidates.length === 0) {
      legalCandidates = enumerateLegalMixtures({
        odorIds: [...session.puzzle.poolIds],
        preset: getPreset(difficulty),
      });
    }
    const historyEntries = history.map((h) => ({
      guess: h.guess,
      ab: { a: h.a, b: h.b },
    }));
    survivingCandidates =
      historyEntries.length === 0
        ? legalCandidates
        : filterCandidates(legalCandidates, {
            history: historyEntries,
            poolIds: session.puzzle.poolIds,
          });
    survivingOdorIds = new Set(
      survivingCandidates.flatMap((m) => m.components.map((c) => c.odorId)),
    );
  }

  function builderSum(): number {
    return selectedComponents().reduce((s, c) => s + c.percent, 0);
  }

  function startTutorial(): void {
    phase = 'tutorial';
    tutorialStep = 0;
    paintTutorial();
  }

  function paintTutorial(): void {
    const c = copy();
    const steps = [
      { title: c.tut1Title, body: c.tut1Body, demo: 'single' as const },
      { title: c.tut2Title, body: c.tut2Body, demo: 'mix' as const },
      { title: c.tut3Title, body: c.tut3Body, demo: 'infer' as const },
    ];
    const step = steps[tutorialStep]!;
    playArea.innerHTML = `
      <div class="tutorial-state" data-testid="tutorial" data-tutorial-step="${tutorialStep}">
        <p class="sp-step-label">${c.tutorial} ${tutorialStep + 1}/3</p>
        <h3>${step.title}</h3>
        <p>${step.body}</p>
        <p class="sp-axis-note">${c.axisNote}</p>
        <canvas class="sp-canvas" data-tut-canvas width="640" height="220" aria-label="${c.chartAria}"></canvas>
        <p class="sr-only" data-tut-sr></p>
        <div class="sp-actions">
          <button type="button" class="text-button" id="skipTutorial" data-testid="skip-tutorial">${c.skipTutorial}</button>
          ${tutorialStep > 0 ? `<button type="button" class="ghost-button" id="tutPrev">${c.back}</button>` : ''}
          <button type="button" class="primary-button" id="tutNext" data-testid="tut-next">${tutorialStep < 2 ? c.next : c.startPlay}</button>
        </div>
      </div>
    `;
    const canvas = playArea.querySelector<HTMLCanvasElement>('[data-tut-canvas]')!;
    const banana = SIGS.get('banana')!;
    let series: readonly number[] = banana;
    if (step.demo === 'mix' || step.demo === 'infer') {
      series = linearMix(
        canonicalizeMixture([
          { odorId: 'banana', percent: 60 },
          { odorId: 'lemon', percent: 40 },
        ]),
        SIGS,
      );
    }
    drawChannelChart(canvas, {
      bars: { values: series, color: '#6ecf8a' },
      curves: [{ values: series, color: '#c4a35a' }],
      xLabel: c.xAxis,
      yLabel: c.yAxis,
      highContrast: store.highContrast,
      reducedMotion: store.reducedMotion,
    });
    const sr = playArea.querySelector('[data-tut-sr]');
    if (sr) sr.textContent = channelSummaryText(series, locale());

    playArea.querySelector('#skipTutorial')?.addEventListener('click', () => {
      store = { ...store, tutorialSeen: true };
      saveStore(store);
      startPlay();
    });
    playArea.querySelector('#tutPrev')?.addEventListener('click', () => {
      tutorialStep = Math.max(0, tutorialStep - 1);
      paintTutorial();
    });
    playArea.querySelector('#tutNext')?.addEventListener('click', () => {
      if (tutorialStep < 2) {
        tutorialStep += 1;
        paintTutorial();
      } else {
        store = { ...store, tutorialSeen: true };
        saveStore(store);
        startPlay();
      }
    });
  }

  function startPlay(): void {
    phase = 'play';
    paintPlay();
  }

  function paintPlay(): void {
    if (!session) return;
    refreshCandidates();
    const c = copy();
    const preset = getPreset(difficulty);
    const remaining = preset.maxGuesses - history.length;
    const target = session.puzzle.observedSignal;
    const sum = builderSum();
    const draftComponents = selectedComponents();
    const draftOk = validateMixture(draftComponents, {
      minPercent: preset.minPercent,
      percentStep: preset.percentStep,
      componentCountMin: preset.componentCountMin,
      componentCountMax: preset.componentCountMax,
    }).ok;
    const canSubmit = draftOk && remaining > 0;
    const mixReveal = preset.revealComponentCount
      ? `<p class="sp-mix-count" data-testid="mix-count">${c.mixCountReveal}: <strong>${session.puzzle.truth.components.length}</strong></p>`
      : '';
    const candidateOdorNames = [...survivingOdorIds]
      .map((id) => odorName(id, locale()))
      .sort((a, b) => a.localeCompare(b));
    const candidatesHtml = `
      <p class="sp-candidates" data-testid="candidates">
        ${c.candidatesLeft}: <strong data-testid="candidate-count">${survivingCandidates.length}</strong>
        · ${c.candidateOdors}: <span data-testid="candidate-odors">${
          candidateOdorNames.length ? candidateOdorNames.join(', ') : '—'
        }</span>
      </p>`;

    playArea.innerHTML = `
      <div class="play-state" data-testid="play">
        <div class="sp-status">
          <span>${c.remaining}: <strong data-testid="remaining">${remaining}</strong></span>
          <span>${c.seed}: <code data-testid="play-seed">${session.meta.seed}</code></span>
        </div>
        <h3>${c.targetSignal}</h3>
        <p class="sp-axis-note">${c.axisNote}</p>
        ${mixReveal}
        <canvas class="sp-canvas" id="targetCanvas" width="640" height="240" aria-label="${c.chartAria}"></canvas>
        <p class="sr-only" id="targetSr"></p>

        ${lastFeedback ? renderFeedback(lastFeedback, c) : ''}
        ${candidatesHtml}

        <section class="sp-builder" aria-label="${c.builder}" data-testid="builder">
          <div class="sp-builder-head">
            <h3>${c.builder}</h3>
            <p class="sp-muted">${c.poolSelect}</p>
          </div>
          <div id="builderSlots" class="sp-pool">${renderPoolRows(c)}</div>
          <p class="sp-sum" data-testid="sum-line">${c.sum}: <strong data-testid="sum">${sum}</strong>/100
            ${sum !== 100 ? `<span class="sp-warn">${c.sumNeed100}</span>` : ''}</p>
          ${autofillNotice ? `<p class="sp-autofill-note" data-testid="autofill-note" role="status">${autofillNotice}</p>` : ''}
          <div class="sp-actions">
            <button type="button" class="ghost-button" id="autofill" data-testid="autofill">${c.autofill}</button>
            <button type="button" class="primary-button" id="submitGuess" data-testid="submit" ${canSubmit ? '' : 'disabled'}>${c.submit}</button>
          </div>
        </section>

        <section class="sp-history" data-testid="history">
          <button type="button" class="text-button" id="toggleHistory" data-testid="toggle-history" aria-expanded="${historyExpanded}">
            ${c.history} (${history.length})
          </button>
          <div class="sp-history-scroll" ${historyExpanded ? '' : 'hidden'}>
            <table class="sp-history-table">
              <thead><tr><th>#</th><th>${c.guess}</th><th>A/B</th><th>${c.signalFit}</th></tr></thead>
              <tbody>
                ${
                  history.length === 0
                    ? `<tr><td colspan="4">${c.noHistory}</td></tr>`
                    : history
                        .map(
                          (h) =>
                            `<tr><td>${h.index}</td><td>${formatMixtureLabel(h.guess, locale())}</td><td>${h.a}A${h.b}B</td><td>${h.fit}</td></tr>`,
                        )
                        .join('')
                }
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `;

    drawChannelChart(playArea.querySelector('#targetCanvas')!, {
      bars: { values: target, color: '#5ec4d1' },
      curves: [{ values: target, color: '#c4a35a' }],
      xLabel: c.xAxis,
      yLabel: c.yAxis,
      highContrast: store.highContrast,
      reducedMotion: store.reducedMotion,
    });
    const tsr = playArea.querySelector('#targetSr');
    if (tsr) tsr.textContent = channelSummaryText(target, locale());

    if (lastFeedback) {
      const fbCanvas = playArea.querySelector<HTMLCanvasElement>('#feedbackCanvas');
      if (fbCanvas) {
        drawChannelChart(fbCanvas, {
          curves: [
            { values: target, color: '#c4a35a' },
            { values: lastFeedback.guessSignal, color: '#6ecf8a' },
          ],
          residualAgainst: {
            target,
            guess: lastFeedback.guessSignal,
            color: '#d17a5e',
          },
          xLabel: c.xAxis,
          yLabel: c.yAxis,
          highContrast: store.highContrast,
          reducedMotion: store.reducedMotion,
        });
      }
    }

    if (preset.showSignatureHints) {
      playArea.querySelectorAll<HTMLCanvasElement>('[data-hint-canvas]').forEach((cv) => {
        const id = cv.dataset.hintCanvas!;
        const sig = SIGS.get(id);
        if (!sig) return;
        drawSignatureHint(cv, sig, store.highContrast);
      });
    }

    bindBuilder(c);
  }

  function renderFeedback(row: GuessHistoryRow, c: Record<string, string>): string {
    return `
      <section class="sp-feedback" data-testid="feedback" aria-live="assertive">
        <p data-testid="ab-result"><strong>${row.a}A${row.b}B</strong> · ${c.signalFit}: <strong data-testid="fit-score">${row.fit}</strong></p>
        <p class="sp-muted">${c.abBlind}</p>
        <canvas class="sp-canvas" id="feedbackCanvas" width="640" height="220" aria-label="${c.chartAria}"></canvas>
        <ul class="sp-legend">
          <li><span class="swatch" style="background:#c4a35a"></span>${c.targetCurve}</li>
          <li><span class="swatch" style="background:#6ecf8a"></span>${c.guessCurve}</li>
          <li><span class="swatch" style="background:#d17a5e"></span>${c.residual}</li>
        </ul>
      </section>
    `;
  }

  function renderPoolRows(c: Record<string, string>): string {
    const preset = getPreset(difficulty);
    return builderRows
      .map((row, i) => {
        const on = row.percent > 0;
        const possible =
          survivingOdorIds.size === 0 || survivingOdorIds.has(row.odorId);
        const hint = preset.showSignatureHints
          ? `<canvas class="sp-hint-canvas" data-hint-canvas="${row.odorId}" width="280" height="72" aria-label="${c.signatureHint}"></canvas>`
          : '';
        return `
          <div class="sp-pool-row${on ? ' is-on' : ''}${possible ? '' : ' is-eliminated'}" data-row="${i}">
            <div class="sp-odor-name">
              <span>${odorName(row.odorId, locale())}</span>
              <span class="sp-pct-label" data-testid="sel-${row.odorId}">${row.percent}%</span>
            </div>
            ${hint}
            <div class="sp-stepper">
              <button type="button" data-dec="${i}" aria-label="-">\u2212</button>
              <input type="range" data-range="${i}" data-testid="range-${row.odorId}" min="0" max="100" step="${preset.percentStep}" value="${row.percent}" />
              <input type="number" data-num="${i}" data-testid="percent-${row.odorId}" min="0" max="100" step="${preset.percentStep}" value="${row.percent}" />
              <button type="button" data-inc="${i}" aria-label="+">+</button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  function bindBuilder(c: Record<string, string>): void {
    const preset = getPreset(difficulty);
    playArea.querySelector('#toggleHistory')?.addEventListener('click', () => {
      historyExpanded = !historyExpanded;
      paintPlay();
    });
    playArea.querySelector('#autofill')?.addEventListener('click', () => {
      const selected = builderRows.filter((r) => r.percent > 0);
      if (selected.length === 0) {
        autofillNotice = c.autofillFail;
        paintPlay();
        return;
      }
      const target = selected[selected.length - 1]!;
      const sumOthers = selected
        .filter((r) => r.odorId !== target.odorId)
        .reduce((s, r) => s + r.percent, 0);
      const remain = 100 - sumOthers;
      if (remain < preset.minPercent || remain % preset.percentStep !== 0 || remain > 100) {
        autofillNotice = c.autofillFail;
      } else {
        const prev = target.percent;
        target.percent = remain;
        target.selected = true;
        autofillNotice = c.autofillOk
          .replace('{odor}', odorName(target.odorId, locale()))
          .replace('{from}', String(prev))
          .replace('{to}', String(remain));
      }
      paintPlay();
    });
    playArea.querySelector('#submitGuess')?.addEventListener('click', submitGuess);

    const setPercent = (i: number, value: number) => {
      const step = preset.percentStep;
      let v = Math.round(value / step) * step;
      v = Math.max(0, Math.min(100, v));
      if (v > 0 && v < preset.minPercent) v = preset.minPercent;
      builderRows[i]!.percent = v;
      builderRows[i]!.selected = v > 0;
      autofillNotice = '';
      paintPlay();
    };

    playArea.querySelectorAll('[data-inc]').forEach((el) => {
      el.addEventListener('click', () => {
        const i = Number((el as HTMLElement).dataset.inc);
        const cur = builderRows[i]!.percent;
        setPercent(i, cur === 0 ? preset.minPercent : cur + preset.percentStep);
      });
    });
    playArea.querySelectorAll('[data-dec]').forEach((el) => {
      el.addEventListener('click', () => {
        const i = Number((el as HTMLElement).dataset.dec);
        const cur = builderRows[i]!.percent;
        if (cur <= preset.minPercent) setPercent(i, 0);
        else setPercent(i, cur - preset.percentStep);
      });
    });
    playArea.querySelectorAll('[data-range]').forEach((el) => {
      el.addEventListener('change', (e) => {
        const i = Number((e.target as HTMLInputElement).dataset.range);
        setPercent(i, Number((e.target as HTMLInputElement).value));
      });
    });
    playArea.querySelectorAll('[data-num]').forEach((el) => {
      el.addEventListener('change', (e) => {
        const i = Number((e.target as HTMLInputElement).dataset.num);
        setPercent(i, Number((e.target as HTMLInputElement).value));
      });
    });
  }

  function submitGuess(): void {
    if (!session) return;
    const preset = getPreset(difficulty);
    if (history.length >= preset.maxGuesses) return;
    const components = selectedComponents();
    const validated = validateMixture(components, {
      minPercent: preset.minPercent,
      percentStep: preset.percentStep,
      componentCountMin: preset.componentCountMin,
      componentCountMax: preset.componentCountMax,
    });
    if (!validated.ok) return;

    const guess = validated.canonical;
    const ab = scoreAB(guess, session.puzzle.truth, session.puzzle.poolIds);
    const guessSignals = computeSignals(
      guess,
      SIGS,
      preset.mixingModel,
      session.meta.seed,
    );
    const fit = signalFitScore(session.puzzle.observedSignal, guessSignals.observed);
    const row: GuessHistoryRow = {
      index: history.length + 1,
      guess,
      a: ab.a,
      b: ab.b,
      fit,
      guessSignal: guessSignals.observed,
    };
    history = [...history, row];
    lastFeedback = row;
    autofillNotice = '';

    const solved =
      mixturesEqual(guess, session.puzzle.truth) ||
      isPerfectAB(ab, session.puzzle.truth.components.length);
    if (solved || history.length >= preset.maxGuesses) {
      finish(solved);
      return;
    }
    paintPlay();
  }

  function finish(solved: boolean): void {
    if (!session) return;
    phase = 'result';
    const elapsedMs = Date.now() - startedAt;
    const breakdown = computeSpectrumScore({
      solved,
      guessesUsed: history.length,
      difficulty,
      elapsedMs,
    });
    store = recordSpectrumBestScore(store, breakdown.scoreKey, breakdown.totalScore);
    saveStore(store);
    paintResult(solved, breakdown);
  }

  function paintResult(
    solved: boolean,
    breakdown: ReturnType<typeof computeSpectrumScore>,
  ): void {
    if (!session) return;
    const c = copy();
    const preset = getPreset(difficulty);
    const truth = session.puzzle.truth;
    const loc = locale();

    const contribHtml = truth.components
      .map((comp) => {
        const sig = SIGS.get(comp.odorId)!;
        const w = comp.percent / 100;
        const weighted = sig.map((v) => v * w);
        return `
          <div class="sp-contrib">
            <h4>${odorName(comp.odorId, loc)} · ${comp.percent}%</h4>
            <canvas class="sp-canvas sp-canvas-sm" data-contrib="${comp.odorId}" width="640" height="160"></canvas>
            <p class="sr-only">${channelSummaryText(weighted, loc)}</p>
          </div>
        `;
      })
      .join('');

    playArea.innerHTML = `
      <div class="result-state" data-testid="result" data-solved="${solved}">
        <h3 data-testid="result-title">${solved ? c.solved : c.failed}</h3>
        <p>${c.truth}: <strong data-testid="truth">${formatMixtureLabel(truth, loc)}</strong></p>
        <div class="sp-score-grid">
          <div>${c.guessScore}: <strong data-testid="guess-score">${breakdown.guessScore}</strong></div>
          <div>${c.timeScore}: <strong data-testid="time-score">${breakdown.timeScore}</strong></div>
          <div>${c.totalScore}: <strong data-testid="total-score">${breakdown.totalScore}</strong></div>
          <div>${c.elapsed}: <strong data-testid="elapsed">${formatElapsed(breakdown.elapsedMs)}</strong></div>
          <div>${c.guessesUsed}: <strong>${breakdown.guessesUsed}/${breakdown.maxGuesses}</strong></div>
          <div>${c.best}: <strong>${store.bestByScoreKey[breakdown.scoreKey] ?? 0}</strong></div>
        </div>
        <p class="sp-muted">${c.scoreScope}</p>
        ${
          preset.mixingModel === 'linear'
            ? `<h4>${c.channelContribution}</h4>${contribHtml}`
            : `<h4>${c.satCompare}</h4>
               <canvas class="sp-canvas" id="satCanvas" width="640" height="220"></canvas>
               <ul class="sp-legend">
                 <li><span class="swatch" style="background:#6ecf8a"></span>${c.linear}</li>
                 <li><span class="swatch" style="background:#5ec4d1"></span>${c.saturated}</li>
                 <li><span class="swatch" style="background:#c4a35a"></span>${c.observed}</li>
               </ul>
               ${
                 preset.mixingModel === 'saturatedNoisy'
                   ? `<p class="sp-disclaimer" data-testid="noise-disclaimer">${c.noiseDisclaimer}</p>`
                   : ''
               }`
        }
        <div class="sp-actions">
          <button type="button" class="primary-button" id="again" data-testid="again">${c.playAgain}</button>
          <button type="button" class="ghost-button" id="toSetup" data-testid="to-setup">${c.backSetup}</button>
        </div>
      </div>
    `;

    if (preset.mixingModel === 'linear') {
      playArea.querySelectorAll<HTMLCanvasElement>('[data-contrib]').forEach((cv) => {
        const id = cv.dataset.contrib!;
        const comp = truth.components.find((x) => x.odorId === id)!;
        const sig = SIGS.get(id)!;
        const weighted = sig.map((v) => v * (comp.percent / 100));
        drawChannelChart(cv, {
          bars: { values: weighted, color: '#6ecf8a' },
          curves: [{ values: weighted, color: '#c4a35a' }],
          xLabel: c.xAxis,
          yLabel: c.yAxis,
          highContrast: store.highContrast,
          reducedMotion: store.reducedMotion,
        });
      });
    } else {
      const sat = playArea.querySelector<HTMLCanvasElement>('#satCanvas');
      if (sat) {
        drawChannelChart(sat, {
          curves: [
            { values: session.puzzle.linearSignal, color: '#6ecf8a' },
            {
              values: session.puzzle.saturatedSignal ?? session.puzzle.linearSignal,
              color: '#5ec4d1',
            },
            { values: session.puzzle.observedSignal, color: '#c4a35a' },
          ],
          xLabel: c.xAxis,
          yLabel: c.yAxis,
          highContrast: store.highContrast,
          reducedMotion: store.reducedMotion,
        });
      }
    }

    playArea.querySelector('#again')?.addEventListener('click', () => {
      onStart();
    });
    playArea.querySelector('#toSetup')?.addEventListener('click', () => {
      session = null;
      paintModes();
      paintSettings();
      paintReady();
    });
  }

  function refreshReady(): void {
    refreshChrome();
    if (phase === 'ready') {
      paintModes();
      paintSettings();
      paintReady();
    } else if (phase === 'tutorial') {
      paintTutorial();
    } else if (phase === 'play') {
      paintPlay();
    }
  }

  refreshChrome();
  paintModes();
  paintSettings();
  paintReady();
  options.onReady?.({ refreshReady });
}
