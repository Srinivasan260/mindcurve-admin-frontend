import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { questionApi } from '../api/question.api';

export function useCategoryQuestions(categoryId: string | undefined) {
  return useQuery({
    queryKey: [...QUERY_KEYS.categoryQuestions, categoryId] as const,
    queryFn: () => questionApi.listQuestions(categoryId!),
    enabled: !!categoryId,
  });
}
