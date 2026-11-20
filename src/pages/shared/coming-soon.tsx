import { PageHeader } from '@/components/layout/header';
import { Card } from '@/components/ui/card';

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
}

export function ComingSoon({ title, subtitle, description }: Props) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} subtitle={subtitle} />
      <Card className="flex min-h-[320px] flex-col items-center justify-center gap-3 p-10 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </span>
        <h2 className="text-xl font-semibold text-ink-900">Coming soon</h2>
        <p className="max-w-md text-sm text-ink-500">
          {description ?? 'This section is being built. Check back shortly.'}
        </p>
      </Card>
    </div>
  );
}
