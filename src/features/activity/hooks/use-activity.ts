import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { activityApi } from '../api/activity.api';
import type { ListActivityParams } from '../types';

export function useActivity(params: ListActivityParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.activity, params] as const,
    queryFn: () => activityApi.list(params),
    placeholderData: keepPreviousData,
  });
}
