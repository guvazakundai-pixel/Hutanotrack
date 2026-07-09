'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
            activeTab === tab.id
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute inset-0 bg-white dark:bg-surface-dark-elevated rounded-xl shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            {tab.badge !== undefined && (
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-medical-500 text-white">
                {tab.badge}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
