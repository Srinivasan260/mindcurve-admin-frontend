import { apiClient } from '@/lib/api-client';
import type { PaginatedEnvelope } from '@/types/api';
import type { ActivityItem, ListActivityParams } from '../types';

export interface ListActivityResult {
  items: ActivityItem[];
  pagination: PaginatedEnvelope<ActivityItem>['pagination'];
}

export const activityApi = {
  list: async (params: ListActivityParams = {}): Promise<ListActivityResult> => {
    const { data } = await apiClient.get<PaginatedEnvelope<ActivityItem>>('/admin/activity', {
      params,
    });
    return { items: data.data, pagination: data.pagination };
  },
};
