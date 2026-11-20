import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { patientApi } from '../api/patient.api';

export function usePatientDetail(patientId: string | undefined) {
  return useQuery({
    queryKey: [...QUERY_KEYS.patient, patientId] as const,
    queryFn: () => patientApi.getDetail(patientId!),
    enabled: Boolean(patientId),
  });
}
