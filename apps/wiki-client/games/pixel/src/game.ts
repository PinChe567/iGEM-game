import {
  applyAnswer, buildDailySession, buildPracticeSession, buildSession, createPracticeSeed, getPreset,
  listMatrixSizes, listNoisePercents, mergePracticeSettings, nearestOdor, odorPattern,
  parsePixelStoredJson, patternDiff, PIXEL_STORAGE_KEY, recordBestScore, recordPlayedSeed,
  summarizeResult, type BuiltSession, type DifficultySettings, type DistractorBias,
  type PixelStoredState,
} from '@suite/core/pixel';
import { CONTENT_VERSION, contentCatalog, getAssetCredit, getOdorById, toPixelOdors } from '@suite/content';
import type { Locale } from '../../../src/i18n/locale';
import type { MessageTree } from '../../../src/i18n/messages';
import {
  loadSuiteExplorer,
  markScienceCard,
  saveSuiteExplorer,
} from '../../../src/progress/explorer';

type Options = {
  getCopy: () => MessageTree;
  getLocale: () => Locale;
  getSoundLabels: () => { on: string; off: string; toggle: string };
  onReady?: (api: { refreshReady: () => void }) => void;
};
const odors = toPixelOdors();
const patternCache = new Map<number, Map<string, boolean[]>>();

export function startPixelGame(options: Options): void {
  let stored = load();
  let settings = mergePracticeSettings({});
  let seed = createPracticeSeed();
  let session: BuiltSession | undefined;
  let round = 0, score = 0, answered = false, studyIndex = 0;
  let muted = stored.muted, reducedEffects = stored.reducedEffects, highContrast = stored.highContrast;
  const playArea = need<HTMLElement>('#playArea');
  const settingsPanel = need<HTMLElement>('#settingsPanel');
  const modeTabs = need<HTMLElement>('#modeTabs');
  const sound = need<HTMLButtonElement>('#soundButton');
  const text = () => options.getCopy().pixel;
  const locale = () => options.getLocale();

  function load(): PixelStoredState {
    try { return parsePixelStoredJson(localStorage.getItem(PIXEL_STORAGE_KEY)); } catch { return parsePixelStoredJson(null); }
  }
  function save() { try { localStorage.setItem(PIXEL_STORAGE_KEY, JSON.stringify(stored)); } catch { /* optional */ } }
  function applyPreferences() {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('reduced-effects', reducedEffects);
    sound.classList.toggle('muted', muted);
    sound.setAttribute('aria-label', muted ? options.getSoundLabels().on : options.getSoundLabels().off);
  }
  function name(id: string) { return getOdorById(id)?.name[locale()] ?? id; }
  function english(id: string) { return getOdorById(id)?.name.en ?? id; }
  function image(id: string, extra = '') {
    const index = contentCatalog.odors.findIndex((odor) => odor.id === id);
    return `<div class="smell-visual ${extra}" style="background-position:${index % 5 * 25}% ${Math.floor(index / 5) * 100 / 3}%" role="img" aria-label="${escape(`${name(id)} / ${english(id)}`)}"></div>`;
  }
  function base(id: string) { return odorPattern(odors, id, settings.matrixSize, patternCache); }
  function grid(cells: readonly ('off' | 'on' | 'noise')[], label: string, diff?: ReturnType<typeof patternDiff>) {
    const answerOnly = new Set(diff?.onlyAnswer), shownOnly = new Set(diff?.onlyShown), shared = new Set(diff?.sharedOn);
    return `<div class="led-matrix" style="--size:${settings.matrixSize}" role="img" aria-label="${escape(label)}">${cells.map((cell, i) => `<i class="led-cell ${cell === 'on' ? 'on' : cell === 'noise' ? 'noise-cell' : ''} ${answerOnly.has(i) ? 'diff-only-answer' : shownOnly.has(i) ? 'diff-only-shown' : shared.has(i) ? 'diff-shared' : ''}"></i>`).join('')}</div>`;
  }
  function setup() {
    session = undefined;
    const c = text();
    modeTabs.innerHTML = `<button class="level-tab active" type="button">${c.practice}</button><button class="level-tab" id="dailyButton" type="button">${c.daily}</button>`;
    settingsPanel.innerHTML = `<h3>${c.settings}</h3>
      <label>${c.matrixSize}<select id="matrixSize">${listMatrixSizes().map((n) => `<option value="${n}" ${n === settings.matrixSize ? 'selected' : ''}>${n} × ${n}</option>`).join('')}</select></label>
      <label>${c.distractorBias}<select id="bias">${(['mixed', 'similar', 'very-similar'] as DistractorBias[]).map((v) => `<option value="${v}" ${v === settings.distractorBias ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
      <fieldset><legend>${c.noise}</legend><div class="activation-picker">${listNoisePercents().map((n) => `<button class="activation-button ${n === settings.noisePercentOfOff ? 'active' : ''}" data-noise="${n}" type="button">${n}%</button>`).join('')}</div></fieldset>
      <label>${c.studyReview}<select id="review"><option value="true" ${settings.allowStudyReview ? 'selected' : ''}>${c.yes}</option><option value="false" ${!settings.allowStudyReview ? 'selected' : ''}>${c.no}</option></select></label>
      <label>${c.displayMs}<select id="display">${[0, 800, 1200].map((n) => `<option value="${n}" ${n === settings.patternDisplayMs ? 'selected' : ''}>${n} ms</option>`).join('')}</select></label>
      <div class="seed-row"><label>${c.settings} seed <input id="seedInput" type="text" value="${escape(seed)}" spellcheck="false" autocomplete="off" /></label><button class="secondary-button" id="newSeed" type="button">${c.randomizeSeed}</button></div>
      <div class="preference-row"><label><input id="reduced" type="checkbox" ${reducedEffects ? 'checked' : ''}/> Reduced effects</label><label><input id="contrast" type="checkbox" ${highContrast ? 'checked' : ''}/> High contrast</label></div><button class="text-button" id="clear" type="button">${c.clearData}</button>`;
    playArea.innerHTML = `<div class="ready-state"><div class="ready-copy"><span class="section-label">GAME 1 · ${c.practice}</span><h3>${c.title}</h3><p>${c.lead}</p><p class="shortcut-help">${c.shortcuts}</p><button class="primary-button" id="start" type="button">${c.startPractice} →</button></div></div>`;
    need<HTMLButtonElement>('#start').onclick = () => {
      const typed = need<HTMLInputElement>('#seedInput').value.trim();
      if (typed) seed = typed;
      session = buildPracticeSession({ odors, settings, seed, contentVersion: CONTENT_VERSION });
      begin();
    };
    need<HTMLButtonElement>('#dailyButton').onclick = () => { settings = getPreset('daily-standard'); session = buildDailySession({ odors, presetId: 'daily-standard', contentVersion: CONTENT_VERSION }); begin(); };
    need<HTMLButtonElement>('#newSeed').onclick = () => { seed = createPracticeSeed(); setup(); };
    need<HTMLInputElement>('#seedInput').onchange = (e) => { seed = (e.target as HTMLInputElement).value.trim() || seed; };
    need<HTMLSelectElement>('#matrixSize').onchange = (e) => change({ matrixSize: Number((e.target as HTMLSelectElement).value) as DifficultySettings['matrixSize'] });
    need<HTMLSelectElement>('#bias').onchange = (e) => change({ distractorBias: (e.target as HTMLSelectElement).value as DistractorBias });
    need<HTMLSelectElement>('#review').onchange = (e) => change({ allowStudyReview: (e.target as HTMLSelectElement).value === 'true' });
    need<HTMLSelectElement>('#display').onchange = (e) => change({ patternDisplayMs: Number((e.target as HTMLSelectElement).value) });
    settingsPanel.querySelectorAll<HTMLButtonElement>('[data-noise]').forEach((b) => b.onclick = () => change({ noisePercentOfOff: Number(b.dataset.noise) as DifficultySettings['noisePercentOfOff'] }));
    need<HTMLInputElement>('#reduced').onchange = (e) => { reducedEffects = (e.target as HTMLInputElement).checked; stored = { ...stored, reducedEffects }; save(); applyPreferences(); };
    need<HTMLInputElement>('#contrast').onchange = (e) => { highContrast = (e.target as HTMLInputElement).checked; stored = { ...stored, highContrast }; save(); applyPreferences(); };
    need<HTMLButtonElement>('#clear').onclick = () => { stored = parsePixelStoredJson(null); muted = reducedEffects = highContrast = false; save(); applyPreferences(); setup(); };
    need<HTMLElement>('#scienceCopy').textContent = contentCatalog.modelDisclaimer[locale()];
    need<HTMLElement>('#creditCopy').textContent = getAssetCredit('odor-atlas')?.creditText[locale()] ?? 'TODO-VERIFY';
  }
  function change(patch: Partial<DifficultySettings>) { settings = mergePracticeSettings({ ...settings, ...patch }); setup(); }
  function begin() { if (!session) return; round = score = studyIndex = 0; answered = false; stored = recordPlayedSeed(stored, session.meta.seed); save(); study(); }
  function study() {
    if (!session) return; const id = session.poolIds[studyIndex]!;
    playArea.innerHTML = `<div class="study-state"><div class="study-topline"><div><span class="section-label">STUDY</span><h3>${name(id)}</h3><p>${english(id)}</p></div><span class="question-count">${studyIndex + 1} / ${session.poolIds.length}</span></div><div class="study-content"><div>${image(id, 'study-image')}</div><div class="study-code">${grid(base(id).map((v) => v ? 'on' : 'off'), name(id))}</div></div><div class="study-actions"><button class="secondary-button" id="prev" type="button" ${studyIndex === 0 || !session.settings.allowStudyReview ? 'disabled' : ''}>←</button><span>${session.settings.allowStudyReview ? 'Review enabled' : 'Review disabled'}</span><button class="primary-button" id="next" type="button">${studyIndex + 1 === session.poolIds.length ? 'Start quiz' : 'Next →'}</button></div></div>`;
    need<HTMLButtonElement>('#prev').onclick = () => { studyIndex--; study(); };
    need<HTMLButtonElement>('#next').onclick = () => studyIndex + 1 === session!.poolIds.length ? question() : (studyIndex++, study());
  }
  function question() {
    if (!session) return; const q = session.questions[round]!, locked = session.settings.patternDisplayMs > 0, c = text();
    playArea.innerHTML = `<div class="quiz-state"><div class="quiz-topline"><div class="progress-track"><div class="progress-fill" style="width:${(round + 1) / session.questions.length * 100}%"></div></div><span class="question-count">${round + 1} / ${session.questions.length}</span><span class="score-pill">${score} PTS</span></div><div class="quiz-main"><div class="question-visual">${grid(q.displayCells, c.shown)}<p>${c.noiseCount} <b>${q.noiseCount}</b> (${settings.noisePercentOfOff}% OFF cells)</p></div><div class="question-panel"><h3>${c.choose}</h3><div class="options-grid">${q.optionIds.map((id, i) => `<button class="option-card" data-id="${id}" type="button" ${locked ? 'disabled' : ''}><kbd>${i + 1}</kbd>${image(id)}<span><strong>${name(id)}</strong><small>${english(id)}</small></span></button>`).join('')}</div><div class="feedback hidden" id="feedback"></div></div></div></div>`;
    playArea.querySelectorAll<HTMLButtonElement>('.option-card').forEach((b) => b.onclick = () => answer(b.dataset.id!));
    if (locked) window.setTimeout(() => playArea.querySelectorAll<HTMLButtonElement>('.option-card').forEach((b) => b.disabled = false), session.settings.patternDisplayMs);
  }
  function answer(id: string) {
    if (!session || answered) return; const q = session.questions[round]!, result = applyAnswer({ settings: session.settings, currentScore: score, answerId: q.answerId, optionIds: q.optionIds, chosenId: id, alreadyAnswered: false });
    answered = true; score = result.nextScore;
    playArea.querySelectorAll<HTMLButtonElement>('.option-card').forEach((b) => { b.disabled = true; b.classList.toggle('correct', b.dataset.id === q.answerId); b.classList.toggle('wrong', b.dataset.id === id && !result.correct); });
    const pool = session.poolIds.map((pid) => odors.find((odor) => odor.id === pid)!).filter(Boolean);
    const closest = nearestOdor(odors.find((odor) => odor.id === q.answerId)!, pool, odors);
    const feedback = need<HTMLElement>('#feedback'); feedback.classList.remove('hidden');
    feedback.innerHTML = `<div class="feedback-copy ${result.correct ? '' : 'wrong'}"><strong>${result.correct ? text().correct : `${text().answer}: ${name(q.answerId)}`}</strong><span>${text().nearest}: ${closest ? name(closest.id) : '—'}</span><div class="diff-grid">${grid(base(q.answerId).map((v) => v ? 'on' : 'off'), 'Pattern difference', patternDiff(base(id), base(q.answerId)))}</div></div><button class="next-button" id="goNext" type="button">${round + 1 === session.questions.length ? text().results : text().next} →</button>`;
    need<HTMLButtonElement>('#goNext').onclick = () => round + 1 === session!.questions.length ? results() : (round++, answered = false, question());
  }
  function results() {
    if (!session) return; const result = summarizeResult(score, session.settings); stored = recordBestScore(stored, session.meta.presetId, score); save();
    playArea.innerHTML = `<div class="result-state"><div class="result-score"><div class="score-ring" style="--score-angle:${score / result.maxScore * 360}deg"><div><strong>${score}</strong><span>FINAL SCORE</span></div></div></div><div class="result-copy"><span class="section-label">${text().results}</span><h3>${result.correctCount} / ${result.questionCount}</h3><div class="result-metrics"><div><strong>${session.meta.seedVersion}</strong><span>seed version</span></div><div><strong>${session.meta.contentVersion}</strong><span>content version</span></div><div><strong>${session.meta.gameVersion}</strong><span>game version</span></div></div><p><code>${session.meta.seed}</code> · ${text().best}: ${stored.bestByPreset[session.meta.presetId] ?? score}</p><div class="result-actions"><button class="secondary-button" id="copy" type="button">${text().copySeed}</button><button class="secondary-button" id="replay" type="button">${text().replay}</button><button class="primary-button" id="setup" type="button">${text().practice}</button></div></div></div>`;
    need<HTMLButtonElement>('#copy').onclick = async () => { try { await navigator.clipboard.writeText(session!.meta.seed); } catch { /* optional */ } need<HTMLButtonElement>('#copy').textContent = text().copied; };
    need<HTMLButtonElement>('#replay').onclick = () => { session = buildSession({ odors, settings: session!.settings, meta: session!.meta }); begin(); };
    need<HTMLButtonElement>('#setup').onclick = setup;
  }
  need<HTMLButtonElement>('#scienceButton').onclick = () => {
    saveSuiteExplorer(markScienceCard(loadSuiteExplorer(), 'pixel'));
    need<HTMLDialogElement>('#scienceDialog').showModal();
  };
  need<HTMLButtonElement>('#creditButton').onclick = () => need<HTMLDialogElement>('#creditDialog').showModal();
  need<HTMLButtonElement>('#guideButton').onclick = () => {
    saveSuiteExplorer(markScienceCard(loadSuiteExplorer(), 'pixel'));
    need<HTMLDialogElement>('#scienceDialog').showModal();
  };
  need<HTMLElement>('#scienceCopy').textContent = contentCatalog.modelDisclaimer[locale()];
  need<HTMLElement>('#creditCopy').textContent = getAssetCredit('odor-atlas')?.creditText[locale()] ?? 'TODO-VERIFY';
  document.querySelectorAll<HTMLElement>('[data-close]').forEach((b) => b.onclick = () => need<HTMLDialogElement>(`#${b.dataset.close}`).close());
  document.addEventListener('keydown', (event) => {
    if (event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;
    if (event.key === 'Escape') document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach((d) => d.close());
    if (event.key === 'Enter' && answered) need<HTMLButtonElement>('#goNext')?.click();
    if (!answered && /^[1-4]$/.test(event.key)) {
      playArea.querySelectorAll<HTMLButtonElement>('.option-card')[Number(event.key) - 1]?.click();
    }
  });
  sound.onclick = () => { muted = !muted; stored = { ...stored, muted }; save(); applyPreferences(); };
  applyPreferences();
  setup();
  options.onReady?.({ refreshReady: () => { if (!session) setup(); } });
}
function need<T extends Element>(selector: string): T { const el = document.querySelector<T>(selector); if (!el) throw new Error(`Missing ${selector}`); return el; }
function escape(value: string): string { return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!); }
