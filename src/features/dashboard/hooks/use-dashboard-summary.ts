import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { dashboardApi } from '../api/dashboard.api';

export function useDashboardSummary(days = 7) {
  return useQuery({
    queryKey: [...QUERY_KEYS.overview, { days }] as const,
    queryFn: () => dashboardApi.summary(days),
  });
}
