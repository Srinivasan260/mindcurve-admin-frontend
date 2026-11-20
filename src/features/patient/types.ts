export type Gender = 'male' | 'female' | 'other';
export type AssessmentStatus = 'in_progress' | 'completed' | 'abandoned';

export interface PatientLastAssessment {
  startedAt: string;
  completedAt: string | null;
  status: AssessmentStatus;
  overallRiskLevel: string | null;
}

export interface AdminPatientSummary {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number | null;
  gender: Gender | null;
  city: string;
  state: string;
  registeredAt: string;
  consentAcceptedAt: string | null;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt: string | null;
  assessmentsCount: number;
  lastAssessment: PatientLastAssessment | null;
}

export type DeclarationStatus = 'signed' | 'pending';

export function declarationStatus(p: AdminPatientSummary): DeclarationStatus {
  return p.consentAcceptedAt ? 'signed' : 'pending';
}

// ---------------------------------------------------------------------------
// Detail view types — one patient + their assessments + score summaries + Q&A
// ---------------------------------------------------------------------------

export type ScoringType = 'total' | 'subscale_sum_cutoff' | 'subscale_mean_band';

export interface PatientDetailCategory {
  id: string;
  name: string;
  slug: string;
}

export interface PatientDetailAssessment {
  id: string;
  status: AssessmentStatus;
  overallRiskLevel: string | null;
  startedAt: string;
  completedAt: string | null;
  category: PatientDetailCategory;
  progress: { answered: number; total: number; percent: number };
  results: {
    subscale: string | null;
    totalScore: number;
    riskLevel: string;
  }[];
}

export interface AdminPatientDetail {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number | null;
  gender: Gender | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  location: string | null;
  maritalStatus: string | null;
  education: string | null;
  occupation: string | null;
  referredBy: string | null;
  consentAcceptedAt: string | null;
  consentVersion: string | null;
  user: {
    email: string;
    isEmailVerified: boolean;
    isActive: boolean;
    lastLoginAt: string | null;
    joinedAt: string;
  };
  stats: {
    assessmentsCount: number;
    clinicalNotesCount: number;
    followUpsCount: number;
  };
  recentAssessments: PatientDetailAssessment[];
  recentNotes: {
    id: string;
    content: string;
    createdAt: string;
    author: { id: string; email: string; role: string };
  }[];
}

// Score summary — polymorphic by scoringType
export interface BandSegment {
  level: string;
  label: string | null;
  color: string | null;
  minScore: number;
  maxScore: number;
}

export interface SummarySubscale {
  key: string;
  score: number;
  maxScore: number | null;
  percent: number | null;
  band: string;
  label: string | null;
  color: string | null;
  bands: BandSegment[];
}

export interface AssessmentSummary {
  assessment: {
    id: string;
    status: AssessmentStatus;
    startedAt: string;
    completedAt: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    scoringType: ScoringType;
  };
  total: {
    score: number;
    maxScore: number | null;
    percent: number | null;
    band: string;
    label: string | null;
    color: string | null;
  } | null;
  subscales: SummarySubscale[];
  subscaleCounts: { band: string; count: number }[];
}

// Q&A detail
export type AnswersFilter = 'all' | 'answered' | 'not_attended';

export interface AssessmentAnswerItem {
  number: number;
  question: {
    id: string;
    text: string;
    type: string;
    subscale: string | null;
    isRequired: boolean;
    isReverseScored: boolean;
    displayOrder: number;
  };
  options: { id: string; optionText: string; score: number; displayOrder: number }[];
  attempted: boolean;
  selectedOption: {
    id: string;
    text: string;
    score: number;
    displayOrder: number;
    scoreSnapshot: number;
    answeredAt: string;
  } | null;
}

export interface AssessmentAnswers {
  assessment: {
    id: string;
    status: AssessmentStatus;
    startedAt: string;
    completedAt: string | null;
  };
  category: { id: string; name: string; slug: string };
  counts: { answered: number; notAttended: number; total: number };
  items: AssessmentAnswerItem[];
}
