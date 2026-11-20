import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center gap-2">
        <span aria-hidden className="relative inline-flex h-10 w-10 items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-10 w-10">
            <defs>
              <linearGradient id="spiral" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#F79A4A" />
                <stop offset="100%" stopColor="#D85811" />
              </linearGradient>
            </defs>
            <path
              fill="url(#spiral)"
              d="M24 4c11 0 20 9 20 20s-9 20-20 20S4 35 4 24c0-7 4-13 10-16-3 3-5 7-5 12 0 9 7 16 16 16 5 0 10-2 13-6-3 2-6 3-10 3-9 0-16-7-16-16 0-5 2-9 6-12-2 2-3 5-3 8 0 6 5 11 11 11 3 0 6-1 8-3-2 1-3 2-5 2-4 0-8-4-8-8 0-3 2-5 4-7-1 1-2 3-2 5 0 3 3 6 6 6 1 0 3-1 4-2-1 1-2 2-3 2-2 0-4-2-4-4 0-2 1-3 2-3z"
            />
          </svg>
        </span>
        <div className="leading-tight">
          <div className="flex items-end gap-1">
            <span className="text-[20px] font-extrabold tracking-tight text-[#1F3C8A]">Athma</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#1F3C8A]">
            Mind Care Hospital
          </div>
          <div className="mt-0.5 text-[9px] italic text-brand-600">— Beacon of Hope —</div>
        </div>
      </div>
    </div>
  );
}
