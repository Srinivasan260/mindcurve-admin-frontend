import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconDownload, IconReport } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import type { PatientDetailAssessment } from '../types';

interface Props {
  assessments: PatientDetailAssessment[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDownloadReport: () => void;
  isDownloading?: boolean;
}

// Circular progress ring drawn with SVG — avoids adding a chart dep.
function ProgressRing({ percent, size = 44 }: { percent: number; size?: number }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgb(254 215 170)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgb(249 115 22)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fontWeight="600"
        fill="rgb(249 115 22)"
      >
        {percent}%
      </text>
    </svg>
  );
}

export function AssessmentsList({
  assessments,
  selectedId,
  onSelect,
  onDownloadReport,
  isDownloading,
}: Props) {
  const quizzesCount = assessments.length;
  return (
    <Card className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-brand-600">
            <IconReport className="h-5 w-5" />
          </span>
          <div>
            <div className="text-sm font-semibold text-ink-900">Assessments</div>
            <div className="text-xs text-ink-500">{quizzesCount} quizzes attended</div>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={onDownloadReport}
          loading={isDownloading}
        >
          <IconDownload className="h-4 w-4" />
          Report
        </Button>
      </div>

      {assessments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-200 px-4 py-8 text-center text-sm text-ink-500">
          No assessments attempted yet.
        </div>
      ) : (
        <div className="space-y-2">
          {assessments.map((a) => {
            const selected = a.id === selectedId;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => onSelect(a.id)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors',
                  selected
                    ? 'border-brand-400 bg-brand-50/60'
                    : 'border-ink-100 bg-white hover:border-brand-200 hover:bg-brand-50/30',
                )}
              >
                <ProgressRing percent={a.progress.percent} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink-900">
                    {a.category.name}
                  </div>
                  <div className="truncate text-xs text-ink-500">
                    {a.progress.answered} of {a.progress.total} answered
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </Card>
  );
}
