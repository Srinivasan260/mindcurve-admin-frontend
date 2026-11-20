import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IconChevronRight } from '@/components/ui/icons';
import { formatDate } from '@/lib/utils';
import { declarationStatus, type AdminPatientSummary } from '../types';

interface Props {
  patient: AdminPatientSummary;
  onOpen?: (patient: AdminPatientSummary) => void;
}

function ageSex(p: AdminPatientSummary): string {
  const bits: string[] = [];
  if (p.age != null) bits.push(`${p.age} yrs`);
  if (p.gender) bits.push(p.gender.charAt(0).toUpperCase() + p.gender.slice(1));
  return bits.join(', ') || '—';
}

export function PatientRow({ patient, onOpen }: Props) {
  const status = declarationStatus(patient);
  const signed = status === 'signed';
  return (
    <button
      type="button"
      onClick={() => onOpen?.(patient)}
      className="grid w-full grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,0.8fr)_auto] items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-brand-50/40"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={patient.fullName} />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-ink-900">{patient.fullName}</div>
          <div className="truncate text-xs text-ink-500">{ageSex(patient)}</div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm text-ink-800">{patient.phone}</div>
        <div className="truncate text-xs text-ink-500">{patient.email}</div>
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm text-ink-800">{patient.city || '—'}</div>
        <div className="truncate text-xs text-ink-500">{patient.state || ''}</div>
      </div>

      <div className="truncate text-sm text-ink-800">{formatDate(patient.registeredAt)}</div>

      <div>
        <Badge tone={signed ? 'brand' : 'warning'} withDot>
          {signed ? 'Signed' : 'Pending'}
        </Badge>
      </div>

      <IconChevronRight className="text-ink-400" />
    </button>
  );
}

export function PatientCard({ patient, onOpen }: Props) {
  const status = declarationStatus(patient);
  const signed = status === 'signed';
  return (
    <button
      type="button"
      onClick={() => onOpen?.(patient)}
      className="flex w-full items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-left shadow-card transition-colors hover:border-brand-200"
    >
      <Avatar name={patient.fullName} />
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-ink-900">{patient.fullName}</div>
            <div className="text-xs text-ink-500">{ageSex(patient)}</div>
          </div>
          <Badge tone={signed ? 'brand' : 'warning'} withDot>
            {signed ? 'Signed' : 'Pending'}
          </Badge>
        </div>
        <div className="truncate text-xs text-ink-600">
          {patient.phone} · {patient.email}
        </div>
        <div className="flex items-center justify-between text-xs text-ink-500">
          <span className="truncate">
            {patient.city}
            {patient.state ? `, ${patient.state}` : ''}
          </span>
          <span>{formatDate(patient.registeredAt)}</span>
        </div>
      </div>
    </button>
  );
}
