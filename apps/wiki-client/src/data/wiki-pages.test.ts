import { describe, expect, it } from 'vitest';
import {
  attributionsFallbackOpenUrl,
  resolveAttributionsEmbedUrl,
  siteConfig,
  socialLinks,
} from './site';
import { teamCatalog } from './team';
import { humanPracticesCatalog } from './human-practices';
import { educationCatalog, assertEducationActivity } from './education';

describe('wiki site attributions allowlist', () => {
  it('does not invent a URL when attributionsEmbedUrl is empty', () => {
    expect(siteConfig.attributionsEmbedUrl).toBe('');
    expect(resolveAttributionsEmbedUrl('')).toEqual({ ok: false, reason: 'empty' });
    expect(resolveAttributionsEmbedUrl()).toEqual({ ok: false, reason: 'empty' });
    expect(attributionsFallbackOpenUrl()).toBeNull();
  });

  it('accepts only allowlisted igem hosts over https', () => {
    expect(resolveAttributionsEmbedUrl('https://igem.org/teams/example').ok).toBe(true);
    expect(resolveAttributionsEmbedUrl('https://2025.igem.wiki/example/attributions').ok).toBe(
      true,
    );
    expect(resolveAttributionsEmbedUrl('https://docs.google.com/forms/x')).toEqual({
      ok: false,
      reason: 'not_allowlisted',
    });
    expect(resolveAttributionsEmbedUrl('http://igem.org/x')).toEqual({
      ok: false,
      reason: 'invalid',
    });
  });

  it('exposes confirmed social outbound links only', () => {
    const links = socialLinks();
    expect(links.map((l) => l.id).sort()).toEqual(['email', 'instagram', 'linkedin']);
    expect(links.find((l) => l.id === 'linkedin')?.href).toBe(
      'https://www.linkedin.com/company/aerosensebio/',
    );
    expect(links.find((l) => l.id === 'instagram')?.href).toBe(
      'https://www.instagram.com/igem_tsinghua/',
    );
    expect(links.find((l) => l.id === 'email')?.href).toBe('mailto:aerosensebio@gmail.com');
  });
});

describe('wiki content catalogs stay empty until team fills them', () => {
  it('team roster starts empty (no invented members)', () => {
    expect(teamCatalog.members).toEqual([]);
  });

  it('human practices catalogs start empty', () => {
    expect(humanPracticesCatalog.stakeholders).toEqual([]);
    expect(humanPracticesCatalog.engagements).toEqual([]);
    expect(humanPracticesCatalog.decisionTimeline).toEqual([]);
  });

  it('education catalog starts empty; completed requires results', () => {
    expect(educationCatalog.activities).toEqual([]);
    expect(() =>
      assertEducationActivity({
        id: 'x',
        title: { en: 'X', 'zh-Hant': '' },
        status: 'completed',
        audienceAndNeeds: { en: '', 'zh-Hant': '' },
        learningObjectives: { en: '', 'zh-Hant': '' },
        coDesignAdaptation: { en: '', 'zh-Hant': '' },
        materials: { en: '', 'zh-Hant': '' },
        activity: { en: '', 'zh-Hant': '' },
        safetyInclusivityAccessibility: { en: '', 'zh-Hant': '' },
        evaluationMethod: 'pre-post',
        evaluationNotes: { en: '', 'zh-Hant': '' },
        results: { en: '', 'zh-Hant': '' },
        whatChangedAfterFeedback: { en: '', 'zh-Hant': '' },
        reusableDownloads: [],
        license: { en: '', 'zh-Hant': '' },
      }),
    ).toThrow(/results/);
  });
});
