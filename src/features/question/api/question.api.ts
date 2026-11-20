import { apiClient, type ApiEnvelope } from '@/lib/api-client';
import type { Category, CategoryStats, Question } from '../types';

export const questionApi = {
  stats: async (): Promise<CategoryStats> => {
    const { data } = await apiClient.get<ApiEnvelope<CategoryStats>>(
      '/admin/categories/stats',
    );
    return data.data;
  },

  listCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<ApiEnvelope<Category[]>>('/admin/categories');
    return data.data;
  },

  getCategory: async (categoryId: string): Promise<Category> => {
    const { data } = await apiClient.get<ApiEnvelope<Category>>(
      `/admin/categories/${encodeURIComponent(categoryId)}`,
    );
    return data.data;
  },

  listQuestions: async (categoryId: string): Promise<Question[]> => {
    const { data } = await apiClient.get<ApiEnvelope<Question[]>>(
      `/admin/categories/${encodeURIComponent(categoryId)}/questions`,
    );
    return data.data;
  },
};
