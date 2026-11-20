import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/header';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardSkeleton, ErrorState, Skeleton } from '@/components/ui/states';
import { IconSearch } from '@/components/ui/icons';
import { patientDetailPath } from '@/constants';
import { KpiCard } from '@/features/dashboard/components/kpi-card';
import { PatientCard, PatientRow } from '@/features/patient/components/patient-row';
import { usePatients } from '@/features/patient/hooks/use-patients';
import { declarationStatus, type DeclarationStatus } from '@/features/patient/types';
import { useDebouncedValue } from '@/hooks/use-debounced';
import { cn } from '@/lib/utils';

type Filter = 'all' | DeclarationStatus;

const filterChips: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'signed', label: 'Declaration signed' },
  { key: 'pending', label: 'Declaration pending' },
];

const PAGE_SIZE = 20;

export default function PatientsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search, 300);

  const { data, isLoading, isFetching, isError, refetch } = usePatients({
    search: debouncedSearch || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;

  // The declaration filter runs client-side against the current page since
  // the backend list endpoint has no dedicated consent filter. Server-side
  // search (name/email) still happens via `?search`.
  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((p) => declarationStatus(p) === filter);
  }, [items, filter]);

  const signedCount = useMemo(
    () => items.filter((p) => declarationStatus(p) === 'signed').length,
    [items],
  );
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentCount = useMemo(
    () => items.filter((p) => new Date(p.registeredAt).getTime() >= sevenDaysAgo).length,
    [items, sevenDaysAgo],
  );

  const total = pagination?.total ?? items.length;
  const totalPages = pagination?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <PageHeader title="Patients" subtitle="Everyone registered on the platform" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <KpiCard label="Registered patients" value={total.toLocaleString()} footerTone="neutral" />
            <KpiCard
              label="Declaration signed (page)"
              value={signedCount}
              footerTone="neutral"
            />
            <KpiCard
              label="Joined in the last 7 days (page)"
              value={recentCount}
              footerTone="neutral"
            />
          </>
        )}
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 lg:flex-1">
            <div className="w-full sm:max-w-sm">
              <Input
                placeholder="Search by name or email"
                leftSlot={<IconSearch />}
                value={search}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="scroll-thin -mx-1 flex gap-2 overflow-x-auto px-1">
              {filterChips.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
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
          </div>
          <span className="text-xs font-medium text-ink-500 lg:text-sm">
            {isFetching && !isLoading ? 'Refreshing… ' : ''}
            {filtered.length} of {total} patients
          </span>
        </div>

        {isError ? (
          <div className="mt-4">
            <ErrorState
              title="Couldn't load patients"
              message="Please check the backend and retry."
              onRetry={() => refetch()}
            />
          </div>
        ) : isLoading ? (
          <div className="mt-4 space-y-3">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="scroll-thin mt-4 hidden overflow-x-auto md:block">
              <div className="min-w-[860px]">
                <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto] items-center gap-4 border-b border-ink-100 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
                  <div>Patient</div>
                  <div>Contact</div>
                  <div>Location</div>
                  <div>Registered</div>
                  <div>Declaration</div>
                  <div className="w-5" />
                </div>
                <div className="divide-y divide-ink-100">
                  {filtered.length === 0 ? (
                    <div className="px-6 py-10 text-center text-sm text-ink-500">
                      No patients match your filters.
                    </div>
                  ) : (
                    filtered.map((p) => (
                      <PatientRow
                        key={p.id}
                        patient={p}
                        onOpen={(pp) => navigate(patientDetailPath(pp.id))}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="mt-4 grid gap-3 md:hidden">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-ink-100 bg-white px-6 py-10 text-center text-sm text-ink-500">
                  No patients match your filters.
                </div>
              ) : (
                filtered.map((p) => (
                  <PatientCard
                    key={p.id}
                    patient={p}
                    onOpen={(pp) => navigate(patientDetailPath(pp.id))}
                  />
                ))
              )}
            </div>

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
          </>
        )}
      </Card>
    </div>
  );
}
