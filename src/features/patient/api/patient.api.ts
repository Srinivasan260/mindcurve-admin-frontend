import { apiClient } from '@/lib/api-client';
import type { ApiEnvelope, PaginatedEnvelope } from '@/types/api';
import type {
  AdminPatientDetail,
  AdminPatientSummary,
  AnswersFilter,
  AssessmentAnswers,
  AssessmentSummary,
} from '../types';

export interface ListPatientsParams {
  search?: string;
  city?: string;
  page?: number;
  pageSize?: number;
}

export interface ListPatientsResult {
  items: AdminPatientSummary[];
  pagination: PaginatedEnvelope<AdminPatientSummary>['pagination'];
}

export const patientApi = {
  list: async (params: ListPatientsParams = {}): Promise<ListPatientsResult> => {
    const { data } = await apiClient.get<PaginatedEnvelope<AdminPatientSummary>>(
      '/admin/patients',
      { params },
    );
    return { items: data.data, pagination: data.pagination };
  },

  getDetail: async (patientId: string): Promise<AdminPatientDetail> => {
    const { data } = await apiClient.get<ApiEnvelope<AdminPatientDetail>>(
      `/admin/patients/${patientId}`,
    );
    return data.data;
  },

  getAssessmentSummary: async (
    patientId: string,
    assessmentId: string,
  ): Promise<AssessmentSummary> => {
    const { data } = await apiClient.get<ApiEnvelope<AssessmentSummary>>(
      `/admin/patients/${patientId}/assessments/${assessmentId}/summary`,
    );
    return data.data;
  },

  getAssessmentAnswers: async (
    patientId: string,
    assessmentId: string,
    filter: AnswersFilter = 'all',
  ): Promise<AssessmentAnswers> => {
    const { data } = await apiClient.get<ApiEnvelope<AssessmentAnswers>>(
      `/admin/patients/${patientId}/assessments/${assessmentId}/answers`,
      { params: { filter } },
    );
    return data.data;
  },

  // PDF bytes returned as a Blob so callers can trigger a download or open an
  // inline viewer. Do NOT wrap in the ApiEnvelope — this endpoint streams a
  // raw application/pdf body.
  downloadReport: async (patientId: string, assessmentId?: string): Promise<Blob> => {
    const { data } = await apiClient.get<Blob>(`/admin/patients/${patientId}/report`, {
      params: assessmentId ? { assessmentId } : undefined,
      responseType: 'blob',
    });
    return data;
  },
};
