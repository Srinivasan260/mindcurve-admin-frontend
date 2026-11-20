import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { AdminPatientDetail } from '../types';

interface Props {
  patient: AdminPatientDetail;
}

function ageGender(p: AdminPatientDetail): string[] {
  const bits: string[] = [];
  if (p.age != null) bits.push(`${p.age} yrs`);
  if (p.gender) bits.push(p.gender.charAt(0).toUpperCase() + p.gender.slice(1));
  return bits;
}

// Short display id until we add a sequential patient_number column.
function shortId(uuid: string): string {
  return uuid.replace(/-/g, '').slice(0, 8).toUpperCase();
}

export function PatientDetailHeader({ patient }: Props) {
  const signed = Boolean(patient.consentAcceptedAt);
  const active = patient.user.isActive;
  const chips = [
    `Patient ID ${shortId(patient.id)}`,
    ...ageGender(patient),
    patient.city,
  ].filter(Boolean) as string[];

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:p-6">
      <div className="flex items-center gap-4">
        <Avatar name={patient.fullName} size="lg" tone="brand" />
        <div className="min-w-0">
          <h1 className="truncate text-xl font-extrabold text-ink-900 sm:text-2xl">
            {patient.fullName}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700"
              >
                {c}
              </span>
            ))}
            <Badge tone={signed ? 'brand' : 'warning'} withDot>
              {signed ? 'Declaration signed' : 'Declaration pending'}
            </Badge>
            <Badge tone={active ? 'brand' : 'neutral'} withDot>
              {active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
