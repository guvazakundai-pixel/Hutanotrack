'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useAuth } from '@/providers/auth-provider';
import { UserRole } from '@/types';
import { CalendarCheck, Users, ClipboardList, HeartPulse, ArrowRight } from 'lucide-react';

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

function PatientDashboard() {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-medical-500 to-medical-700 text-white border-0 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold">My Health Overview</h2>
          <p className="text-medical-100 text-sm mt-1">Your records and upcoming care at a glance.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-medical-200">Visits this month</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-medical-200">Active medications</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/appointments">
          <Card hover padding="sm">
            <div className="flex items-center gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-medical-50 text-medical-500">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100">Next Appointment</p>
                <p className="text-sm text-gray-500">Jan 20, 2025 at 09:00 AM</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Card>
        </Link>
        <Link href="/family">
          <Card hover padding="sm">
            <div className="flex items-center gap-3 p-2">
              <div className="p-2.5 rounded-xl bg-healthcare-50 text-healthcare-500">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100">Family Portal</p>
                <p className="text-sm text-gray-500">4 family members linked</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Health Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Jan 15, 2025', type: 'Check-up', doctor: 'Dr. Moyo', result: 'BP 138/88, Glucose 7.8' },
              { date: 'Jan 08, 2025', type: 'Blood Test', doctor: 'Lab Staff', result: 'HbA1c: 7.2%' },
              { date: 'Jan 01, 2025', type: 'Follow-up', doctor: 'Dr. Moyo', result: 'Medication adjusted' },
            ].map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 shrink-0">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{r.type}</p>
                  <p className="text-xs text-gray-500">{r.doctor} &middot; {r.date}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{r.result}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CHWDashboard() {
  return (
    <div className="space-y-4">
      <WelcomeCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Assigned Patients', value: '38', icon: Users, variant: 'default' as const },
          { label: 'Visits This Week', value: '12', icon: CalendarCheck, variant: 'success' as const },
          { label: 'High Risk', value: '5', icon: HeartPulse, variant: 'danger' as const },
          { label: 'Pending Reports', value: '3', icon: ClipboardList, variant: 'warning' as const },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} padding="sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl shrink-0 ${
                  s.variant === 'danger' ? 'bg-red-50 text-red-500' :
                  s.variant === 'warning' ? 'bg-amber-50 text-amber-500' :
                  s.variant === 'success' ? 'bg-healthcare-50 text-healthcare-500' :
                  'bg-medical-50 text-medical-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
            <Badge variant="green">+12% this year</Badge>
          </CardHeader>
          <CardContent>
            <AreaChart data={monthlyData} color="#2563eb" height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disease Prevalence</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={diseaseData} color="#16a34a" height={280} horizontal />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
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
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{apt.patient}</p>
                    <p className="text-xs text-gray-500">{apt.type} &middot; {apt.doctor}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-medium text-medical-500 whitespace-nowrap">{apt.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ClinicalDashboard() {
  return (
    <div className="space-y-4">
      <WelcomeCard />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
            <Badge variant="green">+12% this year</Badge>
          </CardHeader>
          <CardContent>
            <AreaChart data={monthlyData} color="#2563eb" height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disease Prevalence</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={diseaseData} color="#16a34a" height={280} horizontal />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
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
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{apt.patient}</p>
                    <p className="text-xs text-gray-500">{apt.type} &middot; {apt.doctor}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-medium text-medical-500 whitespace-nowrap">{apt.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-4">
      <WelcomeCard />
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="sm">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">12</p>
            <p className="text-xs text-gray-500 mt-1">Active Staff</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">3</p>
            <p className="text-xs text-gray-500 mt-1">Clinics</p>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">98%</p>
            <p className="text-xs text-gray-500 mt-1">System Uptime</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
            <Badge variant="green">+12% this year</Badge>
          </CardHeader>
          <CardContent>
            <AreaChart data={monthlyData} color="#2563eb" height={280} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disease Prevalence</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={diseaseData} color="#16a34a" height={280} horizontal />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
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
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{apt.patient}</p>
                    <p className="text-xs text-gray-500">{apt.type} &middot; {apt.doctor}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-medium text-medical-500 whitespace-nowrap">{apt.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  const role = user?.role ?? UserRole.DOCTOR;

  if (role === UserRole.PATIENT) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full space-y-4 min-w-0">
          <PatientDashboard />
        </motion.div>
      </DashboardLayout>
    );
  }

  if (role === UserRole.CHW) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full space-y-4 min-w-0">
          <CHWDashboard />
        </motion.div>
      </DashboardLayout>
    );
  }

  if (role === UserRole.ADMIN) {
    return (
      <DashboardLayout>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full space-y-4 min-w-0">
          <AdminDashboard />
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full space-y-4 min-w-0">
        <ClinicalDashboard />
      </motion.div>
    </DashboardLayout>
  );
}
