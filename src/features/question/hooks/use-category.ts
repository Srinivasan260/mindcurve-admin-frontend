import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { questionApi } from '../api/question.api';

export function useCategory(categoryId: string | undefined) {
  return useQuery({
    queryKey: [...QUERY_KEYS.category, categoryId] as const,
    queryFn: () => questionApi.getCategory(categoryId!),
    enabled: !!categoryId,
  });
}
