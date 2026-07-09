export interface User {
  id: string;
  phoneNumber: string;
  email?: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId?: string;
  clinicId?: string;
  isActive: boolean;
  isVerified: boolean;
  preferredLanguage: Language;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export enum Language {
  ENGLISH = 'en',
  SHONA = 'sn',
  NDEBELE = 'nd',
}

export interface Address {
  street?: string;
  city?: string;
  province?: string;
  district?: string;
  village?: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface Patient extends User {
  dateOfBirth: string;
  gender: Gender;
  address: Address;
  emergencyContacts: EmergencyContact[];
  bloodType?: BloodType;
  allergies: string[];
  chronicConditions: string[];
  riskLevel: RiskLevel;
  assignedCHWId?: string;
  familyMembers: FamilyMember[];
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum BloodType {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
}

export enum RiskLevel {
  GREEN = 'green',
  AMBER = 'amber',
  RED = 'red',
}

export interface FamilyMember {
  id: string;
  patientId: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  isVerified: boolean;
  permissions: FamilyMemberPermission[];
}

export enum FamilyMemberPermission {
  VIEW_ADHERENCE = 'view_adherence',
  VIEW_APPOINTMENTS = 'view_appointments',
  RECEIVE_ALERTS = 'receive_alerts',
}
