export enum UserRole {
  ADMIN = 'ADMIN',
  CLINIC_OWNER = 'CLINIC_OWNER',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  CHW = 'CHW',
  PATIENT = 'PATIENT',
}

export type RiskLevel = 'green' | 'amber' | 'red';

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'checked_in'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'missed';

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: UserRole;
  clinicId?: string | null;
}

export interface Patient {
  id: string;
  userId: string;
  user: User;
  dateOfBirth: string;
  gender: string;
  nationalId?: string;
  village?: string;
  district?: string;
  province?: string;
  diseases: string[];
  riskLevel: RiskLevel;
  chwId?: string;
  clinicId?: string;
  enrolledAt?: string;
  createdAt: string;
}

export interface VitalSigns {
  bloodPressure?: { systolic: number; diastolic: number };
  bloodGlucose?: { value: number; unit: string; context?: string };
  heartRate?: number;
  temperature?: number;
  weight?: number;
  oxygenSaturation?: number;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  bloodPressure?: { systolic: number; diastolic: number };
  bloodGlucose?: { value: number; unit: string; context?: string };
  heartRate?: number;
  temperature?: number;
  weight?: number;
  oxygenSaturation?: number;
  symptoms?: string[];
  mood?: string;
  notes?: string;
  recordedBy: string;
  recordedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient?: Patient;
  doctorId?: string;
  clinicId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  type: string;
  location?: string;
  notes?: string;
  createdAt: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  status: string;
  refillDate?: string;
  adherenceRate: number;
  totalDoses: number;
  takenDoses: number;
  missedDoses: number;
}

export interface Referral {
  id: string;
  patientId: string;
  patient?: Patient;
  fromCHWId?: string;
  fromClinicId: string;
  toClinicId: string;
  toFacility: string;
  reason: string;
  notes?: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  highRiskPatients: number;
  todaysAppointments: number;
  missedAppointments: number;
  totalReferrals: number;
  activeMedications: number;
  patientRiskBreakdown: { riskLevel: string; count: number }[];
}

export interface AIInsight {
  type: string;
  title: string;
  description: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  actionable: boolean;
}

export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
  roles: UserRole[];
  badge?: number;
}
