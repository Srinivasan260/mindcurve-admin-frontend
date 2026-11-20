import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';
import { patientApi, type ListPatientsParams } from '../api/patient.api';

export function usePatients(params: ListPatientsParams) {
  return useQuery({
    queryKey: [...QUERY_KEYS.patients, params] as const,
    queryFn: () => patientApi.list(params),
    placeholderData: keepPreviousData,
  });
}
