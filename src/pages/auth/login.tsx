import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate } from 'react-router-dom';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import { Badge } from '@/components/ui/badge';
import { IconEye, IconEyeOff } from '@/components/ui/icons';
import { useLogin } from '@/features/auth/hooks/use-login';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/constants';

export default function LoginPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const login = useLogin();

  if (isAuthenticated) return <Navigate to={ROUTES.dashboard} replace />;

  const onSubmit = handleSubmit((values) => login.mutate(values));

  return (
    <div className="bg-auth flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-10">
          <div className="flex justify-center">
            <Logo />
          </div>

          <div className="mt-6 flex justify-center">
            <Badge tone="brand" withDot className="uppercase tracking-wider">
              Admin
            </Badge>
          </div>

          <div className="mt-5 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-ink-500">
              Sign in to manage your counselling platform.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="admin@gmail.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              error={errors.password?.message}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="rounded-full p-1 text-ink-500 hover:text-ink-800"
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              }
              {...register('password')}
            />

            <Button type="submit" size="lg" className="w-full" loading={login.isPending}>
              Sign in
            </Button>

            <p className="pt-1 text-center text-xs text-ink-400">Authorized personnel only</p>
          </form>
        </div>
      </div>
    </div>
  );
}
