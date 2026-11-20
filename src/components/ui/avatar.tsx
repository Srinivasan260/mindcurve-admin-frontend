import { cn, initials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'brand' | 'neutral';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

const toneClasses = {
  brand: 'bg-brand-500 text-white',
  neutral: 'bg-ink-200 text-ink-700',
};

export function Avatar({ name, size = 'md', tone = 'neutral', className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
