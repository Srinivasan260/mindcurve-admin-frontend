import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ErrorState, Skeleton } from '@/components/ui/states';
import { IconArrowLeft, IconSearch } from '@/components/ui/icons';
import { useCategory } from '@/features/question/hooks/use-category';
import { useCategoryQuestions } from '@/features/question/hooks/use-category-questions';
import { QuestionItem } from '@/features/question/components/question-item';
import { QuizAbout } from '@/features/question/components/quiz-about';
import { deriveCategoryTag } from '@/features/question/utils';
import { formatShortDate } from '@/lib/utils';
import { ROUTES } from '@/constants';

export default function QuestionDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  // Both hooks mount on the same tick → React Query fires both HTTP requests
  // concurrently, so the quiz-about sidebar and question list stream in parallel.
  const categoryQuery = useCategory(categoryId);
  const questionsQuery = useCategoryQuestions(categoryId);

  const category = categoryQuery.data;

  const sortedQuestions = useMemo(
    () =>
      (questionsQuery.data ?? [])
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder),
    [questionsQuery.data],
  );

  const [search, setSearch] = useState('');

  const filteredQuestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedQuestions;
    return sortedQuestions.filter((item) => item.questionText.toLowerCase().includes(q));
  }, [sortedQuestions, search]);

  return (
    <div className="space-y-6">
      {/* Top bar: back pill + page title */}
      <PageHeader
        title="Questions & Answers"
        subtitle="How patients respond to each assessment question"
      />

      <button
        type="button"
        onClick={() => navigate(ROUTES.questions)}
        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
      >
        <IconArrowLeft className="h-4 w-4" />
        All quizzes
      </button>

      {/* Quiz hero */}
      {categoryQuery.isError ? (
        <ErrorState
          title="Couldn't load this category"
          message="The category may have been removed or the backend is unreachable."
          onRetry={() => categoryQuery.refetch()}
        />
      ) : categoryQuery.isLoading ? (
        <Card className="p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-3 h-8 w-80" />
          <Skeleton className="mt-3 h-4 w-48" />
        </Card>
      ) : category ? (
        <Card className="p-6">
          <Badge tone="brand">{deriveCategoryTag(category)}</Badge>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[28px]">
            {category.name}
          </h2>
          <p className="mt-1.5 text-sm text-ink-500">
            {(category.questionCount ?? sortedQuestions.length) || 0} questions, added{' '}
            {formatShortDate(category.createdAt)}
          </p>
        </Card>
      ) : null}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left: About this quiz */}
        <aside className="order-2 lg:order-1 lg:sticky lg:top-6 lg:self-start">
          {category ? (
            <QuizAbout
              category={category}
              questionCount={sortedQuestions.length || category.questionCount}
            />
          ) : (
            <Card className="p-6">
              <Skeleton className="h-6 w-40" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </Card>
          )}
        </aside>

        {/* Right: search + question list */}
        <section className="order-1 min-w-0 lg:order-2">
          <Card className="p-4 sm:p-6">
            <div className="w-full sm:max-w-md">
              <Input
                placeholder="Search questions"
                leftSlot={<IconSearch />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {questionsQuery.isError ? (
              <div className="mt-4">
                <ErrorState
                  title="Couldn't load questions"
                  message="Please check the backend and retry."
                  onRetry={() => questionsQuery.refetch()}
                />
              </div>
            ) : questionsQuery.isLoading ? (
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-28" />
                ))}
              </div>
            ) : sortedQuestions.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-ink-100 bg-white px-6 py-12 text-center text-sm text-ink-500">
                This category has no questions yet.
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-ink-100 bg-white px-6 py-12 text-center text-sm text-ink-500">
                No questions match “{search}”.
              </div>
            ) : (
              <ul className="mt-2 divide-y divide-ink-100">
                {filteredQuestions.map((q, i) => (
                  <li key={q.id}>
                    <QuestionItem question={q} index={i} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
