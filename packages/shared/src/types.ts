import { z } from 'zod';

// ===== Enums =====
export enum UserRole {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  RECEPTIONIST = 'receptionist',
  PHARMACIST = 'pharmacist',
  LAB_STAFF = 'lab_staff',
  DATA_MANAGER = 'data_manager',
  CHW = 'chw',
  PATIENT = 'patient',
  FAMILY = 'family',
}

export enum RiskLevel {
  GREEN = 'green',
  AMBER = 'amber',
  RED = 'red',
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  MISSED = 'missed',
}

export enum ReferralStatus {
  PENDING = 'pending',
  RECEIVED = 'received',
  TREATED = 'treated',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum MedicationStatus {
  ACTIVE = 'active',
  DISCONTINUED = 'discontinued',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Language {
  ENGLISH = 'en',
  SHONA = 'sho',
  NDEBELE = 'nde',
}

export enum VisitType {
  HOME = 'home',
  CLINIC = 'clinic',
  HOSPITAL = 'hospital',
  TELEMEDICINE = 'telemedicine',
}

export enum NotificationType {
  SMS = 'sms',
  PUSH = 'push',
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
  VOICE = 'voice',
}

export enum DiseaseType {
  DIABETES = 'diabetes',
  HYPERTENSION = 'hypertension',
  HIV = 'hiv',
  TB = 'tb',
  MATERNAL = 'maternal',
  ELDERLY = 'elderly',
  MENTAL_HEALTH = 'mental_health',
  OTHER = 'other',
}

// ===== Zod Schemas =====
export const PhoneSchema = z.string().regex(/^(\+263|0)[0-9]{9}$/, 'Invalid Zimbabwe phone number');

export const EmailSchema = z.string().email().optional();

export const PasswordSchema = z.string().min(8, 'Password must be at least 8 characters');

export const BloodPressureSchema = z.object({
  systolic: z.number().min(60).max(300),
  diastolic: z.number().min(40).max(200),
});

export const BloodGlucoseSchema = z.object({
  value: z.number().min(1).max(50),
  unit: z.enum(['mmol/L', 'mg/dL']),
  timestamp: z.string().datetime(),
  context: z.enum(['fasting', 'postprandial', 'random', 'hba1c']).optional(),
});

export const VitalSignsSchema = z.object({
  bloodPressure: BloodPressureSchema.optional(),
  bloodGlucose: BloodGlucoseSchema.optional(),
  heartRate: z.number().min(30).max(250).optional(),
  temperature: z.number().min(34).max(42).optional(),
  weight: z.number().min(1).max(500).optional(),
  oxygenSaturation: z.number().min(50).max(100).optional(),
  respiratoryRate: z.number().min(5).max(60).optional(),
});

export const EmergencyScreeningSchema = z.object({
  chestPain: z.boolean(),
  severeHeadache: z.boolean(),
  blurredVision: z.boolean(),
  difficultyBreathing: z.boolean(),
  highGlucoseSymptoms: z.boolean(),
  pregnancyDangerSigns: z.boolean(),
  additionalNotes: z.string().optional(),
});

// ===== Interfaces =====
export interface User {
  id: string;
  phone: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  language: Language;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  dateOfBirth: string;
  gender: Gender;
  nationalId?: string;
  village?: string;
  district?: string;
  province?: string;
  emergencyContact?: string;
  emergencyContactName?: string;
  diseases: DiseaseType[];
  riskLevel: RiskLevel;
  chwId?: string;
  clinicId?: string;
  familyMembers: string[];
}

export interface CHW extends User {
  assignedVillages: string[];
  assignedPatients: string[];
  supervisorId?: string;
  district: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId?: string;
  chwId?: string;
  clinicId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  type: VisitType;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
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
  status: MedicationStatus;
  refillDate?: string;
  adherenceRate: number;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  vitalSigns: VitalSigns;
  symptoms: string[];
  mood?: string;
  exercise?: string;
  waterIntake?: number;
  notes?: string;
  recordedBy: string;
  recordedAt: string;
  isOffline: boolean;
}

export interface Referral {
  id: string;
  patientId: string;
  fromCHWId?: string;
  fromClinicId: string;
  toClinicId: string;
  toFacility: string;
  reason: string;
  notes?: string;
  status: ReferralStatus;
  priority: 'routine' | 'urgent' | 'emergency';
  createdAt: string;
  updatedAt: string;
}

export interface HomeVisit {
  id: string;
  patientId: string;
  chwId: string;
  date: string;
  gpsLocation: { lat: number; lng: number };
  notes?: string;
  photos?: string[];
  vitalSigns?: VitalSigns;
  symptoms?: string[];
  followUpActions?: string;
  isOffline: boolean;
  syncedAt?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: string;
  clinicId: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  reorderLevel: number;
  supplier?: string;
  lastRestocked?: string;
}

export interface LabRequest {
  id: string;
  patientId: string;
  requestedBy: string;
  testType: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'collected' | 'processing' | 'completed' | 'cancelled';
  result?: string;
  resultDate?: string;
  notes?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  channel: NotificationType;
  read: boolean;
  sentAt: string;
  readAt?: string;
}

// ===== API Response Types =====
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AIInsight {
  type: 'risk_prediction' | 'adherence_prediction' | 'appointment_prediction' | 'clinical_summary' | 'lifestyle_suggestion';
  title: string;
  description: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  actionable: boolean;
}
