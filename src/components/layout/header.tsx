import { formatHeaderDate } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showDate?: boolean;
}

export function PageHeader({ title, subtitle, actions, showDate = true }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        {actions}
        {showDate && (
          <span className="inline-flex h-10 items-center rounded-full border border-ink-200 bg-white px-4 text-sm font-medium text-ink-700">
            {formatHeaderDate()}
          </span>
        )}
      </div>
    </div>
  );
}

/** Kept for backwards compatibility with the router/layout import. */
export { PageHeader as Header };
