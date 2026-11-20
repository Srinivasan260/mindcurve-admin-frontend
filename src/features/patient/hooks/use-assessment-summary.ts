import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { patientApi } from '../api/patient.api';

export function useAssessmentSummary(
  patientId: string | undefined,
  assessmentId: string | undefined,
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.patientSummary, patientId, assessmentId] as const,
    queryFn: () => patientApi.getAssessmentSummary(patientId!, assessmentId!),
    enabled: Boolean(patientId && assessmentId),
  });
}
