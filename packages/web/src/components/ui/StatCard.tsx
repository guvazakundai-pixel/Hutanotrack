'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function StatCard({ label, value, icon, trend, trendLabel, variant = 'default', className }: StatCardProps) {
  const variants = {
    default: 'bg-medical-50 dark:bg-medical-900/20 text-medical-600 dark:text-medical-400',
    success: 'bg-healthcare-50 dark:bg-healthcare-900/20 text-healthcare-600 dark:text-healthcare-400',
    warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    danger: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover className={cn('p-5', className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            {trend !== undefined && (
              <div className="mt-2 flex items-center gap-1.5">
                {trend >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-healthcare-500" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                )}
                <span
                  className={cn(
                    'text-xs font-medium',
                    trend >= 0 ? 'text-healthcare-500' : 'text-red-500',
                  )}
                >
                  {Math.abs(trend)}%
                </span>
                {trendLabel && (
                  <span className="text-xs text-gray-400">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-2xl', variants[variant])}>{icon}</div>
        </div>
      </Card>
    </motion.div>
  );
}
