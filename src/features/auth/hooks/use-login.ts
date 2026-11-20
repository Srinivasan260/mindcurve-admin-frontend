import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/constants';

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ user, token }) => {
      setAuth(user, token);
      toast.success('Welcome back!');
      navigate(ROUTES.dashboard);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
}
