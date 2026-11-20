export type ActivityActorRole = 'patient' | 'admin' | 'doctor';

export interface ActivityActor {
  id: string;
  email: string;
  role: ActivityActorRole;
  fullName: string | null;
}

export interface ActivityItem {
  id: string;
  action: string;
  entityType: string | null;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  actor: ActivityActor | null;
}

export interface ListActivityParams {
  actorId?: string;
  entityType?: string;
  action?: string;
  from?: string; // ISO
  to?: string; // ISO
  page?: number;
  pageSize?: number;
}
