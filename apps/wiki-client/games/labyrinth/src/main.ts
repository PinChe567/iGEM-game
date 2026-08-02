import '@suite/ui/tokens.css';
import '@suite/ui/shell.css';
import '@suite/ui/components.css';
import './styles.css';
import { mountShell, shellMain } from '../../../src/shell/mount';
import { t } from '../../../src/i18n/messages';
import type { Locale } from '../../../src/i18n/locale';
import {
  LABYRINTH_STORAGE_KEY,
  parseLabyrinthStoredJson,
} from '@suite/core/labyrinth';
import { startLabyrinthCampaign } from './campaign';

const appNode = document.querySelector('#app');
if (!(appNode instanceof HTMLElement)) throw new Error('#app missing');
const appRoot: HTMLElement = appNode;

const shell = mountShell(appRoot, {
  homeHref: '../../index.html',
  actionsHtml: '',
  onLocaleChange: (locale: Locale) => {
    try {
      const stored = parseLabyrinthStoredJson(localStorage.getItem(LABYRINTH_STORAGE_KEY));
      localStorage.setItem(
        LABYRINTH_STORAGE_KEY,
        JSON.stringify({ ...stored, locale }),
      );
    } catch {
      /* optional */
    }
    destroy?.();
    boot();
  },
});

let destroy: (() => void) | undefined;

function boot(): void {
  const main = shellMain(appRoot);
  destroy = startLabyrinthCampaign({
    root: main,
    getCopy: () => t(shell.getLocale()).labyrinth,
    getLocale: () => shell.getLocale(),
  }).destroy;
}

boot();
