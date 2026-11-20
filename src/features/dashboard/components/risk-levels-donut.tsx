import { Card } from '@/components/ui/card';
import type { RiskDistributionItem } from '../types';

interface Props {
  title?: string;
  rightLabel?: string;
  centerLabel?: string;
  slices: RiskDistributionItem[];
}

const RADIUS = 60;
const STROKE = 18;
const CIRC = 2 * Math.PI * RADIUS;

// Deterministic colour per known risk level, fallback to a palette ring.
const PALETTE = ['#F8B978', '#EF6B1A', '#7A2E09', '#1F6B2F', '#1F3C8A', '#636879'];
const LEVEL_COLORS: Record<string, string> = {
  low: '#F8B978',
  mild: '#F8B978',
  moderate: '#EF6B1A',
  high: '#7A2E09',
  severe: '#7A2E09',
  very_high: '#7A2E09',
  flagged: '#EF6B1A',
  normal: '#F8B978',
};

function titleCase(s: string): string {
  return s
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function RiskLevelsDonut({
  title = 'Risk levels',
  rightLabel = 'All patients',
  centerLabel = 'patients',
  slices,
}: Props) {
  const total = slices.reduce((sum, s) => sum + s.count, 0) || 0;

  let offset = 0;
  const segments = slices.map((s, i) => {
    const fraction = total ? s.count / total : 0;
    const length = CIRC * fraction;
    const seg = {
      key: s.level,
      label: titleCase(s.level),
      color: LEVEL_COLORS[s.level.toLowerCase()] ?? PALETTE[i % PALETTE.length],
      value: s.count,
      pct: s.percent,
      dashArray: `${length} ${CIRC - length}`,
      dashOffset: -offset,
    };
    offset += length;
    return seg;
  });

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-ink-900 sm:text-lg">{title}</h3>
        <span className="text-xs font-medium text-ink-500">{rightLabel}</span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-6 lg:gap-8">
        <div className="relative h-44 w-44 sm:h-52 sm:w-52">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={RADIUS}
              fill="none"
              stroke="#F1EEEA"
              strokeWidth={STROKE}
            />
            {segments.map((seg) => (
              <circle
                key={seg.key}
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.dashOffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-ink-900 sm:text-3xl">
              {total.toLocaleString()}
            </span>
            <span className="text-xs text-ink-500">{centerLabel}</span>
          </div>
        </div>

        <ul className="w-full space-y-3">
          {segments.length === 0 && (
            <li className="text-center text-sm text-ink-500">No risk data yet.</li>
          )}
          {segments.map((seg) => (
            <li key={seg.key} className="flex items-center gap-3 text-sm">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: seg.color }}
                aria-hidden
              />
              <span className="flex-1 text-ink-700">{seg.label}</span>
              <span className="font-semibold text-ink-900">{seg.value.toLocaleString()}</span>
              <span className="w-10 text-right text-ink-500">{seg.pct}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
