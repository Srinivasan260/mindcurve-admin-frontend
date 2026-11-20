import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatShortDate } from '@/lib/utils';
import type { Category } from '../types';
import { deriveCategoryTag } from '../utils';

interface Props {
  category: Category;
  questionCount?: number;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-wide text-ink-400">{label}</div>
      <div className="mt-1 text-sm text-ink-900">{children}</div>
    </div>
  );
}

export function QuizAbout({ category, questionCount }: Props) {
  const count = questionCount ?? category.questionCount ?? 0;

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-ink-900">About this quiz</h3>

      <div className="mt-5 space-y-5">
        <Field label="Description">
          <p className="font-normal text-ink-700">
            {category.description || 'No description provided.'}
          </p>
        </Field>

        <div>
          <div className="text-sm font-semibold text-ink-900">Details</div>
          <div className="mt-3 space-y-4">
            <Field label="Category">{deriveCategoryTag(category)}</Field>
            <Field label="Status">
              <Badge tone={category.isActive ? 'brand' : 'neutral'} withDot>
                {category.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </Field>
            <Field label="Questions">{count}</Field>
            <Field label="Added on">{formatShortDate(category.createdAt)}</Field>
          </div>
        </div>
      </div>
    </Card>
  );
}
