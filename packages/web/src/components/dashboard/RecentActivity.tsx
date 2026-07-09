'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { getTimeAgo } from '@/lib/utils';
import { Activity, UserPlus, CalendarCheck, AlertTriangle, Pill } from 'lucide-react';

const activities = [
  { id: 1, type: 'patient', title: 'New patient registered', description: 'Tendai Mukanya', time: new Date(Date.now() - 300000) },
  { id: 2, type: 'appointment', title: 'Appointment completed', description: 'Chipo Dube - Check-up', time: new Date(Date.now() - 3600000) },
  { id: 3, type: 'alert', title: 'High-risk alert', description: 'Blessing Ndlovu - BP 180/110', time: new Date(Date.now() - 7200000) },
  { id: 4, type: 'medication', title: 'Refill requested', description: 'Metformin 500mg', time: new Date(Date.now() - 14400000) },
  { id: 5, type: 'patient', title: 'Patient updated', description: 'Rudo Moyo - New vitals recorded', time: new Date(Date.now() - 28800000) },
];

const icons = {
  patient: UserPlus,
  appointment: CalendarCheck,
  alert: AlertTriangle,
  medication: Pill,
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <div className="space-y-1">
        {activities.map((activity, index) => {
          const Icon = icons[activity.type as keyof typeof icons] || Activity;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {getTimeAgo(activity.time.toISOString())}
              </span>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
