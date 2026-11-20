import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconChevronRight, IconQA } from '@/components/ui/icons';
import { ROUTES } from '@/constants';
import type { Category } from '../types';
import { scoringShortLabel } from '../utils';

interface Props {
  category: Category;
}

export function CategoryCard({ category }: Props) {
  const to = `${ROUTES.questions}/${category.id}`;
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <IconQA className="h-5 w-5" />
        </span>
        <Badge tone={category.isActive ? 'success' : 'neutral'} withDot>
          {category.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <h3 className="mt-4 line-clamp-2 text-base font-semibold text-ink-900">
        {category.name}
      </h3>
      <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm text-ink-500">
        {category.description || 'No description provided.'}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-ink-500">
        <span className="rounded-full bg-ink-50 px-2.5 py-1 font-medium">
          {category.questionCount} question{category.questionCount === 1 ? '' : 's'}
        </span>
        <span className="rounded-full bg-ink-50 px-2.5 py-1 font-medium">
          {scoringShortLabel[category.scoringType]}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-ink-100 pt-4">
        <span className="text-xs text-ink-400">#{category.displayOrder}</span>
        <Link to={to} aria-label={`Open ${category.name}`}>
          <Button size="sm" className="gap-1">
            Start
            <IconChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
