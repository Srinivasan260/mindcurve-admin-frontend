import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';

const toneClasses: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  neutral: 'bg-ink-100 text-ink-700',
};

const dotClasses: Record<Tone, string> = {
  brand: 'bg-brand-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  neutral: 'bg-ink-400',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  withDot?: boolean;
}

export function Badge({ tone = 'neutral', withDot, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
      {...rest}
    >
      {withDot && <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses[tone])} />}
      {children}
    </span>
  );
}
