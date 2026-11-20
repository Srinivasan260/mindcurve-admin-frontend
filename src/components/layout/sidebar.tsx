import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';
import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth.store';
import {
  IconActivity,
  IconGrid,
  IconLogout,
  IconQA,
  IconUsers,
} from '@/components/ui/icons';

const navItems = [
  { label: 'Overview', path: ROUTES.dashboard, icon: IconGrid, end: true },
  { label: 'Patients', path: ROUTES.patients, icon: IconUsers },
  { label: 'Questions & Answers', path: ROUTES.questions, icon: IconQA },
  { label: 'Activity', path: ROUTES.activity, icon: IconActivity },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { user, clearAuth } = useAuthStore();

  return (
    <aside className="flex h-full w-full flex-col bg-[#FDF7F2]">
      <div className="px-5 pt-5">
        <Logo />
      </div>

      <div className="mt-6 px-5 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
        Menu
      </div>

      <nav className="scroll-thin mt-2 flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-ink-600 hover:bg-ink-100/60 hover:text-ink-900',
              )
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="m-3 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-card">
        <Avatar name={user?.fullName || user?.email || 'Admin'} tone="brand" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-ink-900">
            {user?.fullName || 'Admin'}
          </div>
          <div className="truncate text-xs text-ink-500">
            {user?.email || 'admin@gmail.com'}
          </div>
        </div>
        <button
          onClick={clearAuth}
          aria-label="Logout"
          className="rounded-full p-2 text-ink-500 hover:bg-ink-100 hover:text-ink-900"
        >
          <IconLogout />
        </button>
      </div>
    </aside>
  );
}
