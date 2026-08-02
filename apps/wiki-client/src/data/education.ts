/**
 * Education activities — structured records only.
 * Never invent student quotes, teacher feedback, or outcome percentages.
 */

export type Localized = { 'zh-Hant': string; en: string };

export type EducationStatus = 'planned' | 'in-progress' | 'completed';

export type EvaluationMethod =
  | 'pre-post'
  | 'feedback-form'
  | 'observation'
  | 'interview'
  | 'other';

export type EducationActivity = {
  id: string;
  title: Localized;
  status: EducationStatus;
  audienceAndNeeds: Localized;
  learningObjectives: Localized;
  coDesignAdaptation: Localized;
  materials: Localized;
  activity: Localized;
  safetyInclusivityAccessibility: Localized;
  evaluationMethod: EvaluationMethod;
  evaluationNotes: Localized;
  /**
   * Results must be team-supplied. Leave empty when planned/in-progress.
   * Do not invent participation counts, quotes, or percentages.
   */
  results: Localized;
  whatChangedAfterFeedback: Localized;
  reusableDownloads: Array<{
    label: Localized;
    href: string;
    license: Localized;
  }>;
  license: Localized;
};

export type EducationCatalog = {
  schemaVersion: '1';
  intro: Localized;
  activities: EducationActivity[];
};

const emptyLoc = (): Localized => ({ 'zh-Hant': '', en: '' });

export const educationCatalog: EducationCatalog = {
  schemaVersion: '1',
  intro: emptyLoc(),
  activities: [],
};

export function assertEducationActivity(a: EducationActivity): void {
  if (!a.id.trim()) throw new Error('education activity id required');
  if (a.status === 'completed' && !a.results.en.trim() && !a.results['zh-Hant'].trim()) {
    throw new Error(
      `education ${a.id}: completed activities require team-supplied results (no invented metrics)`,
    );
  }
}
