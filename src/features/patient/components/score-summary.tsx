import { Card } from '@/components/ui/card';
import { IconAlert, IconArrowUp, IconCheck, IconReport } from '@/components/ui/icons';
import { Skeleton } from '@/components/ui/states';
import { cn } from '@/lib/utils';
import type { AssessmentSummary, BandSegment, SummarySubscale } from '../types';

interface Props {
  summary: AssessmentSummary | undefined;
  isLoading: boolean;
}

// Map a band `level` key to a UI tone. Covers the strings produced by all 3
// scoring recipes on the backend.
function toneForLevel(level: string): 'danger' | 'warning' | 'success' | 'neutral' {
  const l = level.toLowerCase();
  if (l === 'high' || l === 'flagged' || l === 'severe' || l === 'indicated') return 'danger';
  if (l === 'moderate' || l === 'mild' || l === 'elevated') return 'warning';
  if (l === 'low' || l === 'normal' || l === 'average' || l === 'not_indicated' || l === 'no_autism')
    return 'success';
  return 'neutral';
}

const chipClassByTone = {
  danger: 'bg-red-50 text-red-700 border border-red-100',
  warning: 'bg-amber-50 text-amber-700 border border-amber-100',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  neutral: 'bg-ink-100 text-ink-700 border border-ink-200',
};

const barColorByTone = {
  danger: 'bg-red-500',
  warning: 'bg-amber-500',
  success: 'bg-emerald-500',
  neutral: 'bg-ink-400',
};

const topBorderByTone = {
  danger: 'border-t-red-500',
  warning: 'border-t-amber-500',
  success: 'border-t-emerald-500',
  neutral: 'border-t-ink-300',
};

function iconForTone(tone: ReturnType<typeof toneForLevel>) {
  if (tone === 'danger') return <IconArrowUp className="h-3.5 w-3.5" />;
  if (tone === 'warning') return <IconAlert className="h-3.5 w-3.5" />;
  if (tone === 'success') return <IconCheck className="h-3.5 w-3.5" />;
  return null;
}

// "label (percent%)" if percent known; else just label.
function fullLabel(label: string | null, band: string, percent: number | null): string {
  const base = label ?? band.charAt(0).toUpperCase() + band.slice(1).replace(/_/g, ' ');
  return percent != null ? `${base} (${percent}%)` : base;
}

function BandChip({ band, label, percent }: { band: string; label: string | null; percent?: number | null }) {
  const tone = toneForLevel(band);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        chipClassByTone[tone],
      )}
    >
      {iconForTone(tone)}
      {fullLabel(label, band, percent ?? null)}
    </span>
  );
}

// Segment bar: one slice per band; the matched slice is filled with the tone color.
function SegmentBar({ bands, matchedLevel }: { bands: BandSegment[]; matchedLevel: string }) {
  if (bands.length === 0) return null;
  return (
    <div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-ink-100">
        {bands.map((b) => {
          const tone = toneForLevel(b.level);
          const isMatched = b.level === matchedLevel;
          return (
            <div
              key={b.level}
              className={cn(
                'flex-1',
                isMatched ? barColorByTone[tone] : 'bg-transparent',
              )}
            />
          );
        })}
      </div>
      <div className="mt-1 flex text-[10px] text-ink-500">
        {bands.map((b) => (
          <div
            key={b.level}
            className={cn(
              'flex-1 text-center',
              b.level === matchedLevel && 'font-semibold text-ink-700',
            )}
          >
            {b.label ?? b.level}
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscaleIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink-500"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
    </svg>
  );
}

function SubscaleCard({ s }: { s: SummarySubscale }) {
  const tone = toneForLevel(s.band);
  const hasBands = s.bands.length > 0;
  return (
    <div
      className={cn(
        'rounded-xl border border-ink-100 bg-white p-4',
        hasBands && ['border-t-2', topBorderByTone[tone]],
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <SubscaleIcon />
        <div className="truncate text-sm font-semibold capitalize text-ink-800">
          {s.key.replace(/_/g, ' ')}
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="text-2xl font-extrabold text-ink-900">
          {Number.isInteger(s.score) ? s.score : s.score.toFixed(1)}
          {s.maxScore != null && !hasBands && (
            <span className="ml-1 text-sm font-medium text-ink-500">/{s.maxScore}</span>
          )}
        </div>
        {hasBands && <BandChip band={s.band} label={s.label} />}
      </div>
      {hasBands && <SegmentBar bands={s.bands} matchedLevel={s.band} />}
    </div>
  );
}

function CountChip({
  band,
  count,
}: {
  band: string;
  count: number;
}) {
  const tone = toneForLevel(band);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        chipClassByTone[tone],
      )}
    >
      {iconForTone(tone)}
      {count} {band.charAt(0).toUpperCase() + band.slice(1).replace(/_/g, ' ')}
    </span>
  );
}

export function ScoreSummary({ summary, isLoading }: Props) {
  if (isLoading || !summary) {
    return (
      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-6 w-56" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      </Card>
    );
  }

  const hasSubscales = summary.subscales.length > 0;
  const bySubscale = summary.category.scoringType === 'subscale_mean_band';

  return (
    <Card className="overflow-hidden">
      {/* Decorative top accent to match the screenshot */}
      <div className="h-1 bg-gradient-to-r from-brand-500 via-ink-400 to-emerald-500" />

      <div className="p-5">
        {/* Score Summary header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-brand-50 p-2 text-brand-600">
              <IconReport className="h-5 w-5" />
            </span>
            <div>
              <div className="text-base font-semibold text-ink-900">Score Summary</div>
              <div className="text-sm text-ink-500">{summary.category.name}</div>
            </div>
          </div>

          {summary.total && (
            <div className="flex items-center gap-3 rounded-xl bg-brand-50/60 px-4 py-2">
              <div>
                <div className="text-[11px] text-ink-500">Total score</div>
                <div className="text-2xl font-extrabold text-ink-900">
                  {Number.isInteger(summary.total.score)
                    ? summary.total.score
                    : summary.total.score.toFixed(1)}
                </div>
              </div>
              <BandChip
                band={summary.total.band}
                label={summary.total.label}
                percent={summary.total.percent}
              />
            </div>
          )}
        </div>

        {hasSubscales && (
          <>
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-4">
              <span className="text-xs font-medium text-ink-500">
                {bySubscale ? 'Traits' : 'Sub-scales'}
              </span>
              {summary.subscaleCounts.map((c) => (
                <CountChip key={c.band} band={c.band} count={c.count} />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {summary.subscales.map((s) => (
                <SubscaleCard key={s.key} s={s} />
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
