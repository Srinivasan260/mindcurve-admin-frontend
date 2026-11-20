import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { actorName, renderActivity, timeAgo } from '@/features/activity/utils/render-activity';
import type { DashboardActivityItem } from '../types';

interface Props {
  items: DashboardActivityItem[];
}

export function LatestActivity({ items }: Props) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-ink-900 sm:text-lg">Latest activity</h3>
        <Link
          to={ROUTES.activity}
          className="rounded-full border border-ink-200 bg-white px-4 py-1.5 text-xs font-semibold text-ink-700 hover:bg-ink-50"
        >
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 text-center text-sm text-ink-500">No activity yet.</div>
      ) : (
        <ul className="mt-5 divide-y divide-ink-100">
          {items.slice(0, 8).map((item) => {
            const rendered = renderActivity(item);
            return (
              <li
                key={item.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <Avatar name={actorName(item)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink-800">{rendered.sentence}</p>
                  <p className="text-xs text-ink-500">{timeAgo(item.createdAt)}</p>
                </div>
                <Badge tone={rendered.tone} withDot className="hidden sm:inline-flex">
                  {rendered.badgeLabel}
                </Badge>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
