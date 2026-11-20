export type ScoringType = 'total' | 'subscale_sum_cutoff' | 'subscale_mean_band';
export type QuestionType = 'single_choice' | 'multi_choice' | 'scale';

export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  inactiveCategories: number;
  totalQuestions: number;
  activeQuestions: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  scoringType: ScoringType;
  displayOrder: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  /** Not in Swagger yet, but added by the backend to the list response. */
  questionCount: number;
}

/**
 * The backend has shipped options under both `{ optionText, score }` (Swagger)
 * and `{ label, value }` (newer docs). Both are optional on the type and we
 * normalise at render time via `getOptionText` / `getOptionScore`.
 */
export interface QuestionOption {
  id: string;
  questionId: string;
  displayOrder: number;
  optionText?: string;
  score?: number;
  label?: string;
  value?: number;
}

export function getOptionText(opt: QuestionOption): string {
  return opt.label ?? opt.optionText ?? '';
}

export function getOptionScore(opt: QuestionOption): number {
  return opt.value ?? opt.score ?? 0;
}

export interface Question {
  id: string;
  categoryId: string;
  questionText: string;
  questionType: QuestionType;
  subscale: string | null;
  isReverseScored: boolean;
  displayOrder: number;
  isRequired: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  options: QuestionOption[];
}
