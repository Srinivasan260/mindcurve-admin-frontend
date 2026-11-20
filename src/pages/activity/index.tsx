import { useState } from 'react';
import { PageHeader } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ErrorState, Skeleton } from '@/components/ui/states';
import { useActivity } from '@/features/activity/hooks/use-activity';
import type { ListActivityParams } from '@/features/activity/types';
import {
  actorName,
  formatTimestamp,
  renderActivity,
  timeAgo,
} from '@/features/activity/utils/render-activity';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 20;

type ChipKey = 'all' | 'logins' | 'signups' | 'assessments' | 'notes';

const chipParams: Record<ChipKey, Omit<ListActivityParams, 'page' | 'pageSize'>> = {
  all: {},
  logins: { action: 'logged_in' },
  signups: { action: 'registered' },
  assessments: { entityType: 'assessment' },
  notes: { entityType: 'clinical_note' },
};

const chips: { key: ChipKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'logins', label: 'Logins' },
  { key: 'signups', label: 'Signups' },
  { key: 'assessments', label: 'Assessments' },
  { key: 'notes', label: 'Notes' },
];

export default function ActivityPage() {
  const [filter, setFilter] = useState<ChipKey>('all');
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError, refetch } = useActivity({
    ...chipParams[filter],
    page,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const total = pagination?.total ?? items.length;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <PageHeader title="Activity" subtitle="Full audit log of platform events" />

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="scroll-thin -mx-1 flex gap-2 overflow-x-auto px-1">
            {chips.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setPage(1);
                  setFilter(key);
                }}
                className={cn(
                  'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  filter === key
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-ink-200 bg-white text-ink-700 hover:bg-ink-50',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="text-xs font-medium text-ink-500 lg:text-sm">
            {isFetching && !isLoading ? 'Refreshing… ' : ''}
            {total.toLocaleString()} event{total === 1 ? '' : 's'}
          </span>
        </div>

        {isError ? (
          <div className="mt-4">
            <ErrorState
              title="Couldn't load activity"
              message="Please check the backend and retry."
              onRetry={() => refetch()}
            />
          </div>
        ) : isLoading ? (
          <div className="mt-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-ink-100 bg-white px-6 py-12 text-center text-sm text-ink-500">
            No activity matches this filter.
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-ink-100">
            {items.map((item) => {
              const rendered = renderActivity(item);
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-3 py-4 first:pt-2 last:pb-2"
                >
                  <Avatar name={actorName(item)} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink-800">{rendered.sentence}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                      <span>{timeAgo(item.createdAt)}</span>
                      <span className="text-ink-300">·</span>
                      <span>{formatTimestamp(item.createdAt)}</span>
                      {item.entityType && (
                        <>
                          <span className="text-ink-300">·</span>
                          <span className="font-mono text-[11px]">
                            {item.entityType}
                          </span>
                        </>
                      )}
                      {item.actor?.role && (
                        <>
                          <span className="text-ink-300">·</span>
                          <span className="uppercase tracking-wide">
                            {item.actor.role}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <Badge tone={rendered.tone} withDot className="hidden shrink-0 sm:inline-flex">
                    {rendered.badgeLabel}
                  </Badge>
                </li>
              );
            })}
          </ul>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ink-100 pt-4 sm:flex-row">
            <span className="text-xs text-ink-500">
              Page {pagination?.page ?? page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
