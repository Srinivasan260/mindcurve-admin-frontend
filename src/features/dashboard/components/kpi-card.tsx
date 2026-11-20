import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface KpiCardProps {
  label: string;
  value: ReactNode;
  footer?: ReactNode;
  footerTone?: 'brand' | 'neutral' | 'danger';
}

const toneClasses = {
  brand: 'text-brand-600',
  neutral: 'text-ink-500',
  danger: 'text-red-600',
};

export function KpiCard({ label, value, footer, footerTone = 'brand' }: KpiCardProps) {
  return (
    <Card className="p-6">
      <div className="text-sm font-medium text-ink-500">{label}</div>
      <div className="mt-3 text-4xl font-extrabold tracking-tight text-ink-900">{value}</div>
      {footer && (
        <div className={`mt-3 text-xs font-medium ${toneClasses[footerTone]}`}>{footer}</div>
      )}
    </Card>
  );
}
