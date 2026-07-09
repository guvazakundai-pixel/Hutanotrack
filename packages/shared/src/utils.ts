import { NORMAL_RANGES, ADHERENCE_THRESHOLDS } from './constants';
import { RiskLevel, VitalSigns, BloodPressure, BloodGlucose } from './types';

export function calculateRiskLevel(vitals: VitalSigns): RiskLevel {
  if (!vitals.bloodPressure && !vitals.bloodGlucose && !vitals.heartRate) {
    return RiskLevel.GREEN;
  }

  let hasRedFlag = false;
  let hasAmberFlag = false;

  if (vitals.bloodPressure) {
    const { systolic, diastolic } = vitals.bloodPressure;
    if (systolic >= 180 || diastolic >= 120) hasRedFlag = true;
    else if (systolic >= 140 || diastolic >= 90) hasAmberFlag = true;
  }

  if (vitals.bloodGlucose) {
    const { value, unit, context } = vitals.bloodGlucose;
    const converted = unit === 'mg/dL' ? value / 18 : value;
    if (context === 'fasting' && converted > 11.1) hasRedFlag = true;
    else if (context === 'fasting' && converted > 7.0) hasAmberFlag = true;
    else if (converted > 13.9) hasRedFlag = true;
    else if (converted > 10.0) hasAmberFlag = true;
  }

  if (vitals.heartRate) {
    if (vitals.heartRate > 140 || vitals.heartRate < 40) hasRedFlag = true;
    else if (vitals.heartRate > 100 || vitals.heartRate < 50) hasAmberFlag = true;
  }

  if (vitals.oxygenSaturation !== undefined) {
    if (vitals.oxygenSaturation < 90) hasRedFlag = true;
    else if (vitals.oxygenSaturation < 95) hasAmberFlag = true;
  }

  if (vitals.temperature !== undefined) {
    if (vitals.temperature > 39.5 || vitals.temperature < 35.0) hasRedFlag = true;
    else if (vitals.temperature > 38.0 || vitals.temperature < 36.0) hasAmberFlag = true;
  }

  if (hasRedFlag) return RiskLevel.RED;
  if (hasAmberFlag) return RiskLevel.AMBER;
  return RiskLevel.GREEN;
}

export function getAdherenceCategory(rate: number): 'good' | 'fair' | 'poor' {
  if (rate >= ADHERENCE_THRESHOLDS.good) return 'good';
  if (rate >= ADHERENCE_THRESHOLDS.fair) return 'fair';
  return 'poor';
}

export function formatPhoneNumber(phone: string): string {
  if (phone.startsWith('0')) return '+263' + phone.slice(1);
  if (phone.startsWith('+263')) return phone;
  return '+263' + phone;
}

export function generateId(): string {
  return `ht_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function calculateAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function isValueNormal(type: keyof typeof NORMAL_RANGES, value: number): boolean {
  const range = NORMAL_RANGES[type] as { min: number; max: number };
  return value >= range.min && value <= range.max;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getTimeAgo(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
