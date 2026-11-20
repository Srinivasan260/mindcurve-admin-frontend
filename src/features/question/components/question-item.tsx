import { Badge } from '@/components/ui/badge';
import { getOptionScore, getOptionText, type Question } from '../types';
import { questionTypeLabel } from '../utils';

interface Props {
  question: Question;
  index: number;
}

export function QuestionItem({ question, index }: Props) {
  const sortedOptions = [...question.options].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );

  return (
    <div className="py-5">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-600">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug text-ink-900">
            {question.questionText}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Badge tone="brand">{questionTypeLabel[question.questionType]}</Badge>
            {question.subscale && <Badge tone="neutral">{question.subscale}</Badge>}
            {question.isReverseScored && <Badge tone="warning">Reverse scored</Badge>}
            {!question.isRequired && <Badge tone="neutral">Optional</Badge>}
            {!question.isActive && <Badge tone="danger">Inactive</Badge>}
          </div>

          {sortedOptions.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {sortedOptions.map((opt) => (
                <li
                  key={opt.id}
                  className="inline-flex items-center gap-2 rounded-full bg-ink-50 py-1.5 pl-1.5 pr-3 text-sm text-ink-800 ring-1 ring-ink-100"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-800 text-[11px] font-semibold text-white">
                    {getOptionScore(opt)}
                  </span>
                  <span>{getOptionText(opt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
