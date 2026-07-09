'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'purple';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = 'gray', size = 'sm', children, className, dot }: BadgeProps) {
  const variants = {
    green:
      'bg-healthcare-50 text-healthcare-700 dark:bg-healthcare-900/20 dark:text-healthcare-400 border-healthcare-200 dark:border-healthcare-800',
    amber:
      'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    red:
      'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800',
    blue:
      'bg-medical-50 text-medical-700 dark:bg-medical-900/20 dark:text-medical-400 border-medical-200 dark:border-medical-800',
    gray:
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    purple:
      'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  };

  const dots = {
    green: 'bg-healthcare-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-medical-500',
    gray: 'bg-gray-500',
    purple: 'bg-purple-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        size === 'md' && 'px-3 py-1 text-sm',
        variants[variant],
        className,
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dots[variant])} />}
      {children}
    </span>
  );
}

export function RiskBadge({ riskLevel }: { riskLevel: string }) {
  const map: Record<string, { variant: 'green' | 'amber' | 'red'; label: string }> = {
    green: { variant: 'green', label: 'Stable' },
    amber: { variant: 'amber', label: 'Needs Attention' },
    red: { variant: 'red', label: 'Immediate Referral' },
  };

  const { variant, label } = map[riskLevel] || { variant: 'gray', label: riskLevel };
  return (
    <Badge variant={variant} dot>
      {label}
    </Badge>
  );
}
