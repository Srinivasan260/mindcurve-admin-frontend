export interface DashboardKpiAssessments {
  count: number;
  previousWeekCount: number;
  changePercent: number;
}

export interface DashboardKpiRegistered {
  total: number;
  addedThisMonth: number;
}

export interface DashboardKpiHighRisk {
  total: number;
  pendingCallback: number;
}

export interface RiskDistributionItem {
  level: string;
  count: number;
  percent: number;
}

export interface AssessmentsByDayItem {
  day: string; // ISO date
  count: number;
}

export interface RiskByCategoryItem {
  categoryId: string;
  categoryName: string;
  counts: Record<string, number>;
  total: number;
}

import type { ActivityItem } from '@/features/activity/types';

export type DashboardActivityItem = ActivityItem;

export interface DashboardSummary {
  kpis: {
    assessmentsThisWeek: DashboardKpiAssessments;
    registeredPatients: DashboardKpiRegistered;
    highRiskFollowUps: DashboardKpiHighRisk;
    riskDistribution: RiskDistributionItem[];
  };
  assessmentsByDay: AssessmentsByDayItem[];
  riskByCategory: RiskByCategoryItem[];
  activity: DashboardActivityItem[];
}
