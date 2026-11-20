import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CardSkeleton, ErrorState, Skeleton } from '@/components/ui/states';
import { IconSearch } from '@/components/ui/icons';
import { KpiCard } from '@/features/dashboard/components/kpi-card';
import { CategoryCard } from '@/features/question/components/category-card';
import { useCategories } from '@/features/question/hooks/use-categories';
import { useCategoryStats } from '@/features/question/hooks/use-category-stats';
import { cn } from '@/lib/utils';

type Tab = 'all' | 'active' | 'inactive';

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

export default function QuestionsPage() {
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');

  const stats = useCategoryStats();
  const categories = useCategories();

  const items = categories.data ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items
      .filter((c) => {
        if (tab === 'active') return c.isActive;
        if (tab === 'inactive') return !c.isActive;
        return true;
      })
      .filter((c) => {
        if (!q) return true;
        return (
          c.name.toLowerCase().includes(q) ||
          (c.description ?? '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [items, tab, search]);

  const counts = useMemo(
    () => ({
      all: items.length,
      active: items.filter((c) => c.isActive).length,
      inactive: items.filter((c) => !c.isActive).length,
    }),
    [items],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Questions & Answers"
        subtitle="Manage the assessment question bank"
      />

      {/* Stats strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : stats.isError || !stats.data ? (
          <div className="sm:col-span-3">
            <ErrorState
              title="Couldn't load stats"
              message="Please check the backend and retry."
              onRetry={() => stats.refetch()}
            />
          </div>
        ) : (
          <>
            <KpiCard
              label="Quizzes"
              value={stats.data.totalCategories.toLocaleString()}
              footerTone="neutral"
            />
            <KpiCard
              label="Active quizzes"
              value={stats.data.activeCategories.toLocaleString()}
              footer={`${stats.data.inactiveCategories} inactive`}
              footerTone="neutral"
            />
            <KpiCard
              label="Total questions"
              value={stats.data.totalQuestions.toLocaleString()}
              footer={`${stats.data.activeQuestions} active`}
              footerTone="neutral"
            />
          </>
        )}
      </div>

      {/* Tabs + search + grid */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="scroll-thin -mx-1 flex gap-2 overflow-x-auto px-1">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  tab === key
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-ink-200 bg-white text-ink-700 hover:bg-ink-50',
                )}
              >
                {label}
                <span
                  className={cn(
                    'ml-1.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold',
                    tab === key ? 'bg-brand-100 text-brand-700' : 'bg-ink-100 text-ink-600',
                  )}
                >
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full sm:max-w-sm">
            <Input
              placeholder="Search by name or description"
              leftSlot={<IconSearch />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {categories.isError ? (
          <div className="mt-4">
            <ErrorState
              title="Couldn't load categories"
              message="Please check the backend and retry."
              onRetry={() => categories.refetch()}
            />
          </div>
        ) : categories.isLoading ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-56" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-ink-100 bg-white px-6 py-12 text-center text-sm text-ink-500">
            No categories match your filters.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
