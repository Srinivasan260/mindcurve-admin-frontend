import { apiClient, type ApiEnvelope } from '@/lib/api-client';
import type { DashboardSummary } from '../types';

export const dashboardApi = {
  summary: async (days = 7): Promise<DashboardSummary> => {
    const { data } = await apiClient.get<ApiEnvelope<DashboardSummary>>(
      '/admin/dashboard/summary',
      { params: { days } },
    );
    return data.data;
  },
};
