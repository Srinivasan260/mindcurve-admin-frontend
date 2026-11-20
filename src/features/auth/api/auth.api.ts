import { apiClient, type ApiEnvelope } from '@/lib/api-client';
import type { LoginRequest, LoginResponse } from '../types';

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiEnvelope<LoginResponse>>(
      '/admin/auth/login',
      payload,
    );
    return data.data;
  },
};
