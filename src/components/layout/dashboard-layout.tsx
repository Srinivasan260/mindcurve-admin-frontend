import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Logo } from '@/components/ui/logo';
import { IconClose, IconMenu } from '@/components/ui/icons';

export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <div className="flex min-h-screen bg-[#FDF7F2]">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-ink-100 lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink-900/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85%] border-r border-ink-100 bg-[#FDF7F2] shadow-xl">
            <div className="flex items-center justify-end p-2">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full p-2 text-ink-600 hover:bg-ink-100"
              >
                <IconClose />
              </button>
            </div>
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-100 bg-[#FDF7F2]/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-full p-2 text-ink-700 hover:bg-ink-100"
          >
            <IconMenu />
          </button>
          <Logo className="scale-90" />
          <span className="w-10" />
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
