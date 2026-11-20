export const AUTH_TOKEN_KEY = 'admin_auth_token';

export const QUERY_KEYS = {
  auth: ['auth'] as const,
  patients: ['patients'] as const,
  patient: ['patients', 'detail'] as const,
  patientSummary: ['patients', 'summary'] as const,
  patientAnswers: ['patients', 'answers'] as const,
  categories: ['categories'] as const,
  category: ['categories', 'detail'] as const,
  categoryStats: ['categories', 'stats'] as const,
  categoryQuestions: ['categories', 'questions'] as const,
  reports: ['reports'] as const,
  activity: ['activity'] as const,
  overview: ['overview'] as const,
} as const;

export const ROUTES = {
  login: '/login',
  dashboard: '/',
  patients: '/patients',
  patientDetail: '/patients/:patientId',
  questions: '/questions',
  reports: '/reports',
  activity: '/activity',
} as const;

export const patientDetailPath = (patientId: string) => `/patients/${patientId}`;

export const BRAND = {
  hospitalName: 'Athma Mind Care Hospital',
  tagline: 'Beacon of Hope',
  since: 'Since 1975',
  productName: 'Athma Counselling',
};
