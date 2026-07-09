'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/Badge';

const monthlyData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 550 },
  { name: 'Apr', value: 700 },
  { name: 'May', value: 850 },
  { name: 'Jun', value: 780 },
  { name: 'Jul', value: 920 },
  { name: 'Aug', value: 1100 },
  { name: 'Sep', value: 980 },
  { name: 'Oct', value: 1200 },
  { name: 'Nov', value: 1350 },
  { name: 'Dec', value: 1400 },
];

const diseaseData = [
  { name: 'Diabetes', value: 450 },
  { name: 'Hypertension', value: 380 },
  { name: 'HIV', value: 200 },
  { name: 'TB', value: 80 },
  { name: 'Maternal', value: 150 },
  { name: 'Other', value: 120 },
];

const stats = {
  totalPatients: 1380,
  highRiskPatients: 45,
  todaysAppointments: 24,
  missedAppointments: 8,
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <WelcomeCard />
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Patient Growth</CardTitle>
              <Badge variant="green">+12% this year</Badge>
            </CardHeader>
            <CardContent>
              <AreaChart data={monthlyData} color="#2563eb" height={300} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disease Prevalence</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart data={diseaseData} color="#16a34a" height={300} horizontal />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { patient: 'Tendai Mukanya', time: '09:00 AM', type: 'Check-up', doctor: 'Dr. Moyo' },
                  { patient: 'Chipo Dube', time: '10:30 AM', type: 'Follow-up', doctor: 'Dr. Moyo' },
                  { patient: 'Blessing Ndlovu', time: '11:00 AM', type: 'Emergency', doctor: 'Dr. Moyo' },
                  { patient: 'Rudo Moyo', time: '02:00 PM', type: 'Review', doctor: 'Dr. Moyo' },
                  { patient: 'Tafadzwa Chikomo', time: '03:30 PM', type: 'Consultation', doctor: 'Dr. Moyo' },
                ].map((apt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{apt.patient}</p>
                      <p className="text-xs text-gray-500">{apt.type} • {apt.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-medical-500">{apt.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
