import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date: string | Date): string {
  return `${formatDate(date)} at ${formatTime(date)}`;
}

export function getTimeAgo(date: string | Date): string {
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
  return formatDate(date);
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'green':
      return 'text-healthcare-500 bg-healthcare-50 dark:bg-healthcare-900/20';
    case 'amber':
      return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
    case 'red':
      return 'text-red-500 bg-red-50 dark:bg-red-900/20';
    default:
      return 'text-gray-500 bg-gray-50';
  }
}

export function getRiskLabel(riskLevel: string): string {
  switch (riskLevel) {
    case 'green':
      return 'Stable';
    case 'amber':
      return 'Needs Attention';
    case 'red':
      return 'Immediate Referral';
    default:
      return 'Unknown';
  }
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    scheduled: 'bg-medical-50 text-medical-600 dark:bg-medical-900/20 dark:text-medical-400',
    confirmed: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    completed: 'bg-healthcare-50 text-healthcare-600 dark:bg-healthcare-900/20 dark:text-healthcare-400',
    cancelled: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    missed: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    pending: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    active: 'bg-healthcare-50 text-healthcare-600 dark:bg-healthcare-900/20 dark:text-healthcare-400',
  };
  return colors[status] || 'bg-gray-50 text-gray-600';
}

export function calculateAdherenceColor(rate: number): string {
  if (rate >= 80) return 'text-healthcare-500';
  if (rate >= 50) return 'text-amber-500';
  return 'text-red-500';
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function generateId(): string {
  return `ht_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
