import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTES } from '@/constants';

const LoginPage = lazy(() => import('@/pages/auth/login'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const PatientsPage = lazy(() => import('@/pages/patients'));
const PatientDetailPage = lazy(() => import('@/pages/patients/detail'));
const QuestionsPage = lazy(() => import('@/pages/questions'));
const QuestionDetailPage = lazy(() => import('@/pages/questions/detail'));
const ReportsPage = lazy(() => import('@/pages/reports'));
const ActivityPage = lazy(() => import('@/pages/activity'));
const NotFoundPage = lazy(() => import('@/pages/errors/not-found'));

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace />;
  return <Outlet />;
}

const withSuspense = (node: React.ReactNode) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center text-sm text-ink-500">
        Loading…
      </div>
    }
  >
    {node}
  </Suspense>
);

export const router = createBrowserRouter([
  { path: ROUTES.login, element: withSuspense(<LoginPage />) },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: ROUTES.dashboard, element: withSuspense(<DashboardPage />) },
          { path: ROUTES.patients, element: withSuspense(<PatientsPage />) },
          { path: ROUTES.patientDetail, element: withSuspense(<PatientDetailPage />) },
          { path: ROUTES.questions, element: withSuspense(<QuestionsPage />) },
          {
            path: `${ROUTES.questions}/:categoryId`,
            element: withSuspense(<QuestionDetailPage />),
          },
          { path: ROUTES.reports, element: withSuspense(<ReportsPage />) },
          { path: ROUTES.activity, element: withSuspense(<ActivityPage />) },
        ],
      },
    ],
  },
  { path: '*', element: withSuspense(<NotFoundPage />) },
]);
