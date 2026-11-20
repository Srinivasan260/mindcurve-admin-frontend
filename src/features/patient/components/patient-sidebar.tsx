import { Card } from '@/components/ui/card';
import { formatShortDate } from '@/lib/utils';
import type { AdminPatientDetail } from '../types';

interface Props {
  patient: AdminPatientDetail;
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-ink-700">
      <span className="text-brand-600">{icon}</span>
      <h3 className="text-sm font-semibold">{children}</h3>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <div className="text-xs text-ink-500">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-ink-800">{value || '-'}</div>
    </div>
  );
}

const IconPhoneSm = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconBriefcase = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconPin = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export function PatientSidebar({ patient }: Props) {
  const addressLine = [patient.city, patient.state, patient.pincode].filter(Boolean).join(', ');
  return (
    <Card className="divide-y divide-ink-100">
      <div className="px-5 py-4">
        <SectionTitle icon={<IconPhoneSm />}>Contact</SectionTitle>
        <div className="space-y-3">
          <Field label="Phone" value={patient.phone} />
          <Field label="Email" value={patient.email} />
        </div>
      </div>

      <div className="px-5 py-4">
        <SectionTitle icon={<IconBriefcase />}>Background</SectionTitle>
        <div className="space-y-3">
          <Field label="Marital status" value={patient.maritalStatus} />
          <Field label="Education" value={patient.education} />
          <Field label="Occupation" value={patient.occupation} />
        </div>
      </div>

      <div className="px-5 py-4">
        <SectionTitle icon={<IconPin />}>Address</SectionTitle>
        <div className="space-y-2 text-sm">
          <div className="text-xs text-ink-500">Full address</div>
          <div className="whitespace-pre-line font-medium text-ink-800">
            {patient.address || '-'}
            {addressLine && (
              <>
                {patient.address ? '\n' : ''}
                {addressLine}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        <SectionTitle icon={<IconCalendar />}>Registration</SectionTitle>
        <div className="space-y-3">
          <Field label="Registered on" value={formatShortDate(patient.user.joinedAt)} />
          <Field label="Referred by" value={patient.referredBy} />
        </div>
      </div>
    </Card>
  );
}
