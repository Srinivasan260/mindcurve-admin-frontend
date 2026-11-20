import { PageHeader } from '@/components/layout/header';
import { BRAND } from '@/constants';
import { CardSkeleton, ErrorState, Skeleton } from '@/components/ui/states';
import { Card } from '@/components/ui/card';
import { KpiCard } from '@/features/dashboard/components/kpi-card';
import { AssessmentsBarChart } from '@/features/dashboard/components/assessments-bar-chart';
import { RiskLevelsDonut } from '@/features/dashboard/components/risk-levels-donut';
import { LatestActivity } from '@/features/dashboard/components/latest-activity';
import { useDashboardSummary } from '@/features/dashboard/hooks/use-dashboard-summary';

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardSummary(7);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Overview" subtitle={`Today at ${BRAND.productName}`} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-6 h-56" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mx-auto mt-6 h-44 w-44 rounded-full" />
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6">
        <PageHeader title="Overview" subtitle={`Today at ${BRAND.productName}`} />
        <ErrorState
          title="Couldn't load the dashboard"
          message="We couldn't reach the server. Check that the backend is running and try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const {
    kpis: { assessmentsThisWeek, registeredPatients, highRiskFollowUps, riskDistribution },
    assessmentsByDay,
    activity,
  } = data;

  const deltaLabel = (() => {
    const { count, previousWeekCount, changePercent } = assessmentsThisWeek;
    if (changePercent != null) {
      return `${changePercent >= 0 ? '+' : ''}${changePercent}% vs last week`;
    }
    if (previousWeekCount === 0 && count > 0) return 'new this week';
    if (previousWeekCount === 0 && count === 0) return 'no activity yet';
    return `vs ${previousWeekCount} last week`;
  })();

  return (
    <div className="space-y-6">
      <PageHeader title="Overview" subtitle={`Today at ${BRAND.productName}`} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          label="Assessments completed this week"
          value={assessmentsThisWeek.count.toLocaleString()}
          footer={deltaLabel}
          footerTone="brand"
        />
        <KpiCard
          label="Registered patients"
          value={registeredPatients.total.toLocaleString()}
          footer={`+${registeredPatients.addedThisMonth} this month`}
          footerTone="brand"
        />
        <KpiCard
          label="High-risk follow-ups"
          value={highRiskFollowUps.total.toLocaleString()}
          footer={
            <span>
              <span className="text-red-600">
                {highRiskFollowUps.pendingCallback} waiting
              </span>{' '}
              <span className="text-ink-500">for a call</span>
            </span>
          }
          footerTone="brand"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AssessmentsBarChart data={assessmentsByDay} />
        </div>
        <RiskLevelsDonut slices={riskDistribution} />
      </div>

      <LatestActivity items={activity} />
    </div>
  );
}
