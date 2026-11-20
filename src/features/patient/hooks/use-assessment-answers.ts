import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { patientApi } from '../api/patient.api';
import type { AnswersFilter } from '../types';

export function useAssessmentAnswers(
  patientId: string | undefined,
  assessmentId: string | undefined,
  filter: AnswersFilter,
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.patientAnswers, patientId, assessmentId, filter] as const,
    queryFn: () => patientApi.getAssessmentAnswers(patientId!, assessmentId!, filter),
    enabled: Boolean(patientId && assessmentId),
    placeholderData: keepPreviousData,
  });
}
