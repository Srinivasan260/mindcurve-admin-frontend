import type { ReactNode } from 'react';
import type { BadgeProps } from '@/components/ui/badge';
import type { ActivityItem } from '../types';

export function titleCase(s: string): string {
  return s.replace(/[_.-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return iso;
  const diffMs = Date.now() - then;
  const mins = Math.max(0, Math.round(diffMs / 60_000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function actorName(item: ActivityItem): string {
  return item.actor?.fullName || item.actor?.email || 'System';
}

type MetaRecord = Record<string, unknown> | null;

function metaString(meta: MetaRecord, key: string): string | undefined {
  const v = meta?.[key];
  return typeof v === 'string' ? v : undefined;
}

export interface RenderedActivity {
  sentence: ReactNode;
  badgeLabel: string;
  tone: BadgeProps['tone'];
}

/**
 * Renders a human-readable sentence + badge for one activity entry.
 * Backend has emitted both underscore (`assessment_completed`) and dotted
 * (`assessment.completed`) action keys — normalise before matching.
 */
export function renderActivity(item: ActivityItem): RenderedActivity {
  const name = <span className="font-semibold text-ink-900">{actorName(item)}</span>;
  const action = item.action.replace(/\./g, '_');

  switch (action) {
    case 'logged_in': {
      const via = metaString(item.metadata, 'via');
      const viaLabel =
        via === 'admin_login'
          ? ' via admin login'
          : via === 'magic_link'
            ? ' via magic link'
            : via === 'patient_login'
              ? ''
              : via
                ? ` via ${via.replace(/_/g, ' ')}`
                : '';
      return {
        sentence: (
          <>
            {name} <span className="text-ink-600">signed in{viaLabel}</span>
          </>
        ),
        badgeLabel: 'Signed in',
        tone: 'neutral',
      };
    }

    case 'registered':
    case 'patient_created': {
      return {
        sentence: (
          <>
            {name} <span className="text-ink-600">registered on the platform</span>
          </>
        ),
        badgeLabel: 'Signup',
        tone: 'success',
      };
    }

    case 'assessment_started': {
      const category = metaString(item.metadata, 'categoryName');
      return {
        sentence: (
          <>
            {name} <span className="text-ink-600">started the</span>{' '}
            <span className="font-semibold text-ink-900">{category ?? 'assessment'}</span>
            {category && <span className="text-ink-600"> assessment</span>}
          </>
        ),
        badgeLabel: 'Started',
        tone: 'brand',
      };
    }

    case 'assessment_completed': {
      const results = Array.isArray(item.metadata?.['results'])
        ? (item.metadata!['results'] as Array<Record<string, unknown>>)
        : [];
      const firstRisk =
        results[0] && typeof results[0]['riskLevel'] === 'string'
          ? (results[0]['riskLevel'] as string)
          : metaString(item.metadata, 'riskLevel');

      const high = !!firstRisk && /high|severe|flag/i.test(firstRisk);
      return {
        sentence: (
          <>
            {name} <span className="text-ink-600">completed an assessment</span>
            {firstRisk && (
              <>
                {' '}·{' '}
                <span className={high ? 'font-semibold text-red-600' : 'text-ink-600'}>
                  {titleCase(firstRisk)} risk
                </span>
              </>
            )}
          </>
        ),
        badgeLabel: high ? 'High risk' : 'Completed',
        tone: high ? 'danger' : 'brand',
      };
    }

    case 'note_added': {
      const patient = metaString(item.metadata, 'patientName');
      return {
        sentence: (
          <>
            {name} <span className="text-ink-600">added a clinical note</span>
            {patient && (
              <>
                {' '}
                <span className="text-ink-600">for</span>{' '}
                <span className="font-semibold text-ink-900">{patient}</span>
              </>
            )}
          </>
        ),
        badgeLabel: 'Note',
        tone: 'brand',
      };
    }

    case 'follow_up_created': {
      return {
        sentence: (
          <>
            {name} <span className="text-ink-600">scheduled a follow-up</span>
          </>
        ),
        badgeLabel: 'Follow-up',
        tone: 'warning',
      };
    }

    default: {
      const entity = item.entityType ? titleCase(item.entityType) : '';
      return {
        sentence: (
          <>
            {name}{' '}
            <span className="text-ink-600">
              {titleCase(item.action)}
              {entity && ` ${entity.toLowerCase()}`}
            </span>
          </>
        ),
        badgeLabel: titleCase(item.action),
        tone: 'neutral',
      };
    }
  }
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
