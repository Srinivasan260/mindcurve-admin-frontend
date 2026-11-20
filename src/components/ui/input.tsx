import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leftSlot, rightSlot, className, wrapperClassName, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className={cn('w-full', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-semibold text-ink-800">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex h-12 w-full items-center gap-2 rounded-full border bg-white px-4 transition-colors',
          error
            ? 'border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200'
            : 'border-ink-200 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100',
        )}
      >
        {leftSlot && <span className="text-ink-400">{leftSlot}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none',
            className,
          )}
          {...rest}
        />
        {rightSlot && <span className="text-ink-500">{rightSlot}</span>}
      </div>
      {(hint || error) && (
        <p className={cn('mt-1 text-xs', error ? 'text-red-500' : 'text-ink-500')}>
          {error || hint}
        </p>
      )}
    </div>
  );
});
