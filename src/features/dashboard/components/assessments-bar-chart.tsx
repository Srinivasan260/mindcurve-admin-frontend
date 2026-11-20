import { Card } from '@/components/ui/card';
import type { AssessmentsByDayItem } from '../types';

interface Props {
  title?: string;
  rightLabel?: string;
  data: AssessmentsByDayItem[];
}

function labelFor(dayIso: string): string {
  const d = new Date(dayIso);
  if (Number.isNaN(d.getTime())) return dayIso;
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function AssessmentsBarChart({
  title = 'Assessments by day',
  rightLabel,
  data,
}: Props) {
  const label = rightLabel ?? `Last ${data.length || 7} days`;
  const max = Math.max(...data.map((d) => d.count), 1);
  const peakIndex = data.reduce(
    (iMax, d, i, arr) => (d.count > arr[iMax].count ? i : iMax),
    0,
  );
  const ticks = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0];

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-ink-900 sm:text-lg">{title}</h3>
        <span className="text-xs font-medium text-ink-500">{label}</span>
      </div>

      {data.length === 0 ? (
        <div className="mt-10 text-center text-sm text-ink-500">No assessments yet.</div>
      ) : (
        <div className="mt-6 flex gap-3">
          <div className="flex h-56 flex-col justify-between py-1 text-[10px] font-medium text-ink-400 sm:h-64">
            {ticks.map((t, i) => (
              <span key={`${t}-${i}`}>{t}</span>
            ))}
          </div>

          <div className="relative flex-1">
            <div className="absolute inset-0 flex flex-col justify-between py-1">
              {ticks.map((_, i) => (
                <div key={i} className="h-px w-full bg-ink-100" />
              ))}
            </div>

            <div className="relative flex h-56 items-end gap-2 sm:h-64 sm:gap-3">
              {data.map((d, i) => {
                const isPeak = i === peakIndex;
                const heightPct = (d.count / max) * 100;
                return (
                  <div
                    key={d.day}
                    className="group flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <span className="mb-1 text-[11px] font-semibold text-ink-800">
                      {d.count}
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-colors ${
                        isPeak ? 'bg-brand-500' : 'bg-ink-200 group-hover:bg-ink-300'
                      }`}
                      style={{ height: `${heightPct}%` }}
                      aria-label={`${labelFor(d.day)}: ${d.count}`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex gap-2 sm:gap-3">
              {data.map((d) => (
                <span
                  key={d.day}
                  className="flex-1 text-center text-xs font-medium text-ink-500"
                >
                  {labelFor(d.day)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
