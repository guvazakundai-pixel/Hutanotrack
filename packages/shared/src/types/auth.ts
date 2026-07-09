export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
  PHARMACIST = 'pharmacist',
  LAB_STAFF = 'lab_staff',
  DATA_MANAGER = 'data_manager',
  COMMUNITY_HEALTH_WORKER = 'community_health_worker',
  PATIENT = 'patient',
  FAMILY_MEMBER = 'family_member',
}

export enum Permission {
  VIEW_PATIENTS = 'view_patients',
  EDIT_PATIENTS = 'edit_patients',
  DELETE_PATIENTS = 'delete_patients',
  VIEW_APPOINTMENTS = 'view_appointments',
  MANAGE_APPOINTMENTS = 'manage_appointments',
  VIEW_MEDICATIONS = 'view_medications',
  PRESCRIBE_MEDICATIONS = 'prescribe_medications',
  DISPENSE_MEDICATIONS = 'dispense_medications',
  VIEW_LAB_RESULTS = 'view_lab_results',
  ORDER_LAB_TESTS = 'order_lab_tests',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_USERS = 'manage_users',
  MANAGE_CLINICS = 'manage_clinics',
  MANAGE_ROLES = 'manage_roles',
  VIEW_AUDIT_LOGS = 'view_audit_logs',
}

export interface LoginRequest {
  phoneNumber?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthUser {
  id: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  permissions: Permission[];
  organizationId?: string;
}
