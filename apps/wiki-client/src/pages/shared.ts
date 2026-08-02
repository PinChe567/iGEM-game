import type { Locale } from '../i18n/locale';
import type { MessageTree } from '../i18n/messages';

/** Wiki page nav — unused for the game hub (kept for optional about pages). */
export function wikiNavMarkup(_copy: MessageTree, _depth: 0 | 1): string {
  return '';
}

/** Social outbound links — removed from the game UI. */
export function socialOutboundMarkup(_locale: Locale): string {
  void _locale;
  return '';
}

export function loc(
  value: { 'zh-Hant': string; en: string },
  locale: Locale,
): string {
  return (locale === 'zh-Hant' ? value['zh-Hant'] : value.en).trim();
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
