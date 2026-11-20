import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AUTH_TOKEN_KEY } from '@/constants';
import type { AdminUser } from '@/features/auth/types';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AdminUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: 'admin-auth' },
  ),
);
