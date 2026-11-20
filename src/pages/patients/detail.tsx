import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { IconArrowLeft } from '@/components/ui/icons';
import { ErrorState, Skeleton } from '@/components/ui/states';
import { ROUTES } from '@/constants';
import { patientApi } from '@/features/patient/api/patient.api';
import { AnswersPanel } from '@/features/patient/components/answers-panel';
import { AssessmentsList } from '@/features/patient/components/assessments-list';
import { PatientDetailHeader } from '@/features/patient/components/patient-detail-header';
import { PatientSidebar } from '@/features/patient/components/patient-sidebar';
import { ScoreSummary } from '@/features/patient/components/score-summary';
import { useAssessmentAnswers } from '@/features/patient/hooks/use-assessment-answers';
import { useAssessmentSummary } from '@/features/patient/hooks/use-assessment-summary';
import { usePatientDetail } from '@/features/patient/hooks/use-patient-detail';
import type { AnswersFilter } from '@/features/patient/types';

export default function PatientDetailPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const detailQuery = usePatientDetail(patientId);

  const assessments = detailQuery.data?.recentAssessments ?? [];

  // Default to the first assessment in the list once the detail loads. We
  // track `selectedId` separately rather than defaulting via query key so
  // a user's explicit selection isn't overridden on refetch.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  useEffect(() => {
    if (selectedId == null && assessments.length > 0) {
      setSelectedId(assessments[0].id);
    }
  }, [assessments, selectedId]);

  const [filter, setFilter] = useState<AnswersFilter>('all');
  const [downloading, setDownloading] = useState(false);

  const summaryQuery = useAssessmentSummary(patientId, selectedId ?? undefined);
  const answersQuery = useAssessmentAnswers(patientId, selectedId ?? undefined, filter);

  const selectedAssessment = useMemo(
    () => assessments.find((a) => a.id === selectedId) ?? null,
    [assessments, selectedId],
  );

  const handleDownloadReport = async () => {
    if (!patientId) return;
    try {
      setDownloading(true);
      const blob = await patientApi.downloadReport(patientId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name = detailQuery.data?.fullName?.replace(/\s+/g, '-') ?? 'patient';
      link.download = `assessment-report-${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to download report';
      toast.error(message);
    } finally {
      setDownloading(false);
    }
  };

  if (detailQuery.isError) {
    return (
      <div className="space-y-4">
        <Link to={ROUTES.patients}>
          <Button variant="secondary" size="sm">
            <IconArrowLeft className="h-4 w-4" />
            All patients
          </Button>
        </Link>
        <ErrorState
          title="Couldn't load patient"
          message="The patient may not exist or you may not have permission."
          onRetry={() => detailQuery.refetch()}
        />
      </div>
    );
  }

  if (detailQuery.isLoading || !detailQuery.data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-9 w-32" />
        <Skeleton className="h-28 w-full" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  const patient = detailQuery.data;

  return (
    <div className="space-y-5">
      <div>
        <Link to={ROUTES.patients}>
          <Button variant="secondary" size="sm">
            <IconArrowLeft className="h-4 w-4" />
            All patients
          </Button>
        </Link>
      </div>

      <PatientDetailHeader patient={patient} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,300px)]">
        <PatientSidebar patient={patient} />

        <div className="min-w-0 space-y-5">
          {selectedId ? (
            <ScoreSummary summary={summaryQuery.data} isLoading={summaryQuery.isLoading} />
          ) : (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-10 text-center text-sm text-ink-500">
              Select an assessment from the right to view its score summary.
            </div>
          )}

          {selectedId && selectedAssessment && (
            <AnswersPanel
              answers={answersQuery.data}
              isLoading={answersQuery.isLoading}
              filter={filter}
              onFilterChange={setFilter}
            />
          )}
        </div>

        <AssessmentsList
          assessments={assessments}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            setFilter('all');
          }}
          onDownloadReport={handleDownloadReport}
          isDownloading={downloading}
        />
      </div>
    </div>
  );
}
