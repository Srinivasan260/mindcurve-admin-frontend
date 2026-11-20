import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ROUTES } from '@/constants';

export default function NotFoundPage() {
  return (
    <div className="bg-auth flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">
      <Logo />
      <h1 className="mt-10 text-6xl font-extrabold tracking-tight text-ink-900">404</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to={ROUTES.dashboard} className="mt-6">
        <Button>Back to Overview</Button>
      </Link>
    </div>
  );
}
