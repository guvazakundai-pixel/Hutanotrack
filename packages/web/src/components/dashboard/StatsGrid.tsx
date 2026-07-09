'use client';

import { Users, CalendarCheck, AlertTriangle, Activity } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';

interface StatsGridProps {
  stats: {
    totalPatients: number;
    highRiskPatients: number;
    todaysAppointments: number;
    missedAppointments: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Patients"
        value={stats.totalPatients.toLocaleString()}
        icon={<Users className="w-5 h-5" />}
        trend={12}
        trendLabel="vs last month"
      />
      <StatCard
        label="Today's Appointments"
        value={stats.todaysAppointments}
        icon={<CalendarCheck className="w-5 h-5" />}
        variant="success"
      />
      <StatCard
        label="High Risk Patients"
        value={stats.highRiskPatients}
        icon={<AlertTriangle className="w-5 h-5" />}
        variant="danger"
        trend={-5}
        trendLabel="vs last month"
      />
      <StatCard
        label="Missed Appointments"
        value={stats.missedAppointments}
        icon={<Activity className="w-5 h-5" />}
        variant="warning"
        trend={8}
        trendLabel="this month"
      />
    </div>
  );
}
