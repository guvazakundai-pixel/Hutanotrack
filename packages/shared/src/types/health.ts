export interface HealthReading {
  id: string;
  patientId: string;
  type: ReadingType;
  value: number;
  unit: string;
  systolic?: number;
  diastolic?: number;
  recordedAt: string;
  source: ReadingSource;
  notes?: string;
}

export enum ReadingType {
  BLOOD_PRESSURE = 'blood_pressure',
  BLOOD_GLUCOSE = 'blood_glucose',
  WEIGHT = 'weight',
  TEMPERATURE = 'temperature',
  HEART_RATE = 'heart_rate',
  OXYGEN_SATURATION = 'oxygen_saturation',
}

export enum ReadingSource {
  MANUAL = 'manual',
  DEVICE = 'device',
  CHW = 'chw',
  CLINIC = 'clinic',
}

export interface Symptom {
  id: string;
  patientId: string;
  symptom: string;
  severity: SymptomSeverity;
  duration?: string;
  reportedAt: string;
}

export enum SymptomSeverity {
  MILD = 'mild',
  MODERATE = 'moderate',
  SEVERE = 'severe',
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  prescribedBy: string;
  prescribedAt: string;
  startDate: string;
  endDate?: string;
  refillDate?: string;
  isActive: boolean;
  adherencePercentage: number;
}

export interface MedicationReminder {
  id: string;
  medicationId: string;
  scheduleTime: string;
  daysOfWeek: number[];
  isTaken: boolean;
  takenAt?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  type: AppointmentType;
  status: AppointmentStatus;
  scheduledAt: string;
  duration: number;
  notes?: string;
  reason?: string;
  isConfirmed: boolean;
  createdAt: string;
}

export enum AppointmentType {
  CHECKUP = 'checkup',
  FOLLOW_UP = 'follow_up',
  REFERRAL = 'referral',
  EMERGENCY = 'emergency',
  VACCINATION = 'vaccination',
  COUNSELING = 'counseling',
}

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  MISSED = 'missed',
}

export interface EmergencyScreening {
  id: string;
  patientId: string;
  chestPain: boolean;
  severeHeadache: boolean;
  blurredVision: boolean;
  difficultyBreathing: boolean;
  highGlucoseSymptoms: boolean;
  pregnancyDangerSigns: boolean;
  isEmergency: boolean;
  screenedAt: string;
}
