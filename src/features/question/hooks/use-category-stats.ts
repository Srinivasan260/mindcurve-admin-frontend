import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { questionApi } from '../api/question.api';

export function useCategoryStats() {
  return useQuery({
    queryKey: QUERY_KEYS.categoryStats,
    queryFn: () => questionApi.stats(),
  });
}
