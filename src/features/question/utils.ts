import type { Category, QuestionType, ScoringType } from './types';

export const scoringLabel: Record<ScoringType, string> = {
  total: 'Total scoring',
  subscale_sum_cutoff: 'Subscale (sum + cutoff)',
  subscale_mean_band: 'Subscale (mean + band)',
};

export const scoringShortLabel: Record<ScoringType, string> = {
  total: 'Total',
  subscale_sum_cutoff: 'Sum cutoff',
  subscale_mean_band: 'Mean band',
};

export const questionTypeLabel: Record<QuestionType, string> = {
  single_choice: 'Likert',
  multi_choice: 'Multi choice',
  scale: 'Scale',
};

/**
 * Derive a short "category tag" for the badge above the quiz title.
 * The backend doesn't expose an assessment grouping field yet, so we strip
 * common scale words from the name to produce something like
 * "Brief Emotional Intelligence Scale (BEIS-10)" → "Emotional Intelligence".
 */
export function deriveCategoryTag(category: Category): string {
  const base = category.name
    .replace(/\s*\([^)]*\)\s*/g, ' ') // drop "(BEIS-10)"
    .replace(
      /\b(brief|short|comprehensive|the|rating|scale|screening|inventory|questionnaire|test|demo)\b/gi,
      '',
    )
    .replace(/\s+/g, ' ')
    .trim();
  return base || category.name;
}
