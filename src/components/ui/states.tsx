import type { ReactNode } from 'react';
import { Card } from './card';
import { Button } from './button';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink-100 ${className}`} />;
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <Card className={`p-6 ${className}`}>
      <Skeleton className="h-3 w-32" />
      <Skeleton className="mt-4 h-8 w-20" />
      <Skeleton className="mt-3 h-3 w-24" />
    </Card>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: ReactNode;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="flex min-h-[200px] flex-col items-center justify-center gap-3 p-8 text-center">
      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
      <p className="max-w-md text-sm text-ink-500">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Card>
  );
}
