import { Card } from '@/components/ui/card';
import { IconAlert, IconCheck, IconReport } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/states';
import { cn } from '@/lib/utils';
import type { AnswersFilter, AssessmentAnswers } from '../types';

interface Props {
  answers: AssessmentAnswers | undefined;
  isLoading: boolean;
  filter: AnswersFilter;
  onFilterChange: (f: AnswersFilter) => void;
}

const filterTabs: { key: AnswersFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'answered', label: 'Answered' },
  { key: 'not_attended', label: 'Not attended' },
];

function CountCard({
  tone,
  icon,
  value,
  label,
}: {
  tone: 'success' | 'neutral' | 'brand';
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  const bg = {
    success: 'bg-emerald-50 text-emerald-700',
    neutral: 'bg-ink-100 text-ink-700',
    brand: 'bg-brand-50 text-brand-700',
  }[tone];
  return (
    <div className={cn('flex items-center gap-3 rounded-xl px-4 py-3', bg)}>
      <span>{icon}</span>
      <div>
        <div className="text-xl font-extrabold leading-none">{value}</div>
        <div className="mt-1 text-xs font-medium opacity-80">{label}</div>
      </div>
    </div>
  );
}

export function AnswersPanel({ answers, isLoading, filter, onFilterChange }: Props) {
  if (isLoading || !answers) {
    return (
      <Card className="p-5">
        <Skeleton className="h-6 w-56" />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
        <div className="mt-4 space-y-3">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <div className="text-base font-semibold text-ink-900">{answers.category.name}</div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <CountCard
          tone="success"
          icon={<IconCheck className="h-5 w-5" />}
          value={answers.counts.answered}
          label="Answered"
        />
        <CountCard
          tone="neutral"
          icon={<IconAlert className="h-5 w-5" />}
          value={answers.counts.notAttended}
          label="Not attended"
        />
        <CountCard
          tone="brand"
          icon={<IconReport className="h-5 w-5" />}
          value={answers.counts.total}
          label="Questions"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {filterTabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => onFilterChange(t.key)}
            className={cn(
              'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === t.key
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-ink-200 bg-white text-ink-700 hover:bg-ink-50',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-ink-100">
        {answers.items.length === 0 ? (
          <div className="py-10 text-center text-sm text-ink-500">
            No questions match this filter.
          </div>
        ) : (
          answers.items.map((item) => (
            <div key={item.question.id} className="flex gap-4 py-4">
              <div className="w-6 flex-shrink-0 text-right text-sm font-semibold text-ink-500">
                {item.number}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-ink-800">{item.question.text}</div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {item.attempted && item.selectedOption ? (
                    <>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        <IconCheck className="h-3.5 w-3.5" />
                        {item.selectedOption.text}
                      </span>
                      <span className="rounded-full border border-brand-200 bg-white px-2.5 py-1 text-xs font-semibold text-brand-700">
                        Score {item.selectedOption.scoreSnapshot}
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium italic text-ink-500">
                      Not attempted
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
