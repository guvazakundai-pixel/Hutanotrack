export * from './auth';
export * from './user';
export * from './health';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface SyncPayload {
  lastSyncAt: string;
  changes: SyncChange[];
}

export interface SyncChange {
  entity: string;
  action: 'create' | 'update' | 'delete';
  id: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

export enum NotificationType {
  APPOINTMENT_REMINDER = 'appointment_reminder',
  MEDICATION_REMINDER = 'medication_reminder',
  HEALTH_ALERT = 'health_alert',
  REFERRAL_UPDATE = 'referral_update',
  MISSED_APPOINTMENT = 'missed_appointment',
  EMERGENCY = 'emergency',
  SYSTEM = 'system',
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  district: string;
  province: string;
  isActive: boolean;
  createdAt: string;
}

export enum OrganizationType {
  CLINIC = 'clinic',
  HOSPITAL = 'hospital',
  NGO = 'ngo',
  INSURANCE = 'insurance',
  EMPLOYER = 'employer',
}
