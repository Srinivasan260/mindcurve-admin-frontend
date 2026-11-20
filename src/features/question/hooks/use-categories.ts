import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { questionApi } from '../api/question.api';

export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => questionApi.listCategories(),
  });
}
