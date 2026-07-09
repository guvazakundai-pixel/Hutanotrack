'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Users, Calendar, AlertTriangle,
  Activity, Pill, Clock, ArrowUpRight, Circle,
} from 'lucide-react';

const stats = [
  { label: 'Active Patients', value: '1,247', change: '+12%', trend: 'up', icon: Users, color: 'medical' },
  { label: 'Today\'s Appointments', value: '38', change: '+4', trend: 'up', icon: Calendar, color: 'healthcare' },
  { label: 'High Risk Patients', value: '23', change: '-2', trend: 'down', icon: AlertTriangle, color: 'red' },
  { label: 'Medication Adherence', value: '87%', change: '+3%', trend: 'up', icon: Pill, color: 'medical' },
];

const recentActivity = [
  { type: 'appointment', action: 'New appointment scheduled', patient: 'Tendai Mukosi', time: '5 min ago' },
  { type: 'alert', action: 'High BP reading detected', patient: 'Maria Sibanda', time: '15 min ago' },
  { type: 'referral', action: 'Referral completed', patient: 'John Dube', time: '1 hr ago' },
  { type: 'lab', action: 'Lab results uploaded', patient: 'Sarah Ndlovu', time: '2 hrs ago' },
  { type: 'medication', action: 'Prescription refilled', patient: 'Patrick Moyo', time: '3 hrs ago' },
];

const upcomingAppointments = [
  { time: '09:00', patient: 'Tendai Mukosi', type: 'Check-up', doctor: 'Dr. Moyo' },
  { time: '09:30', patient: 'Maria Sibanda', type: 'Follow-up', doctor: 'Dr. Moyo' },
  { time: '10:15', patient: 'John Dube', type: 'Referral', doctor: 'Dr. Chirwa' },
  { time: '11:00', patient: 'Sarah Ndlovu', type: 'Diabetes Review', doctor: 'Dr. Moyo' },
  { time: '11:30', patient: 'Patrick Moyo', type: 'BP Check', doctor: 'Dr. Chirwa' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Good morning, Dr. Moyo</h1>
        <p className="text-neutral-500 mt-1">Here's your clinic overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isUp = stat.trend === 'up';
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-neutral-100 p-5 hover:shadow-card-hover transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-10 w-10 rounded-xl bg-${stat.color}-50 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-healthcare-600' : 'text-red-600'}`}>
                  {stat.change}
                  {isUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                </span>
              </div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Upcoming Appointments</h3>
            <button className="text-sm text-medical-600 hover:text-medical-700 font-medium">View all</button>
          </div>
          <div className="space-y-1">
            {upcomingAppointments.map((apt, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="text-right min-w-[60px]">
                  <p className="text-sm font-semibold text-neutral-900">{apt.time}</p>
                </div>
                <div className="h-10 w-px bg-neutral-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{apt.patient}</p>
                  <p className="text-xs text-neutral-500">{apt.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-500">{apt.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
            <button className="text-sm text-medical-600 hover:text-medical-700 font-medium">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-1">
                  <div className={`h-2 w-2 rounded-full ${
                    item.type === 'alert' ? 'bg-red-500' : 'bg-medical-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900">{item.action}</p>
                  <p className="text-xs text-neutral-500">{item.patient}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'New Patient', icon: Users, color: 'medical' },
          { label: 'Schedule Visit', icon: Calendar, color: 'healthcare' },
          { label: 'New Referral', icon: ArrowUpRight, color: 'amber' },
          { label: 'Quick Check', icon: Activity, color: 'medical' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 p-4 rounded-2xl border border-neutral-100 bg-white hover:shadow-card-hover transition-all duration-200`}
            >
              <div className={`h-10 w-10 rounded-xl bg-${action.color}-50 flex items-center justify-center`}>
                <Icon className={`h-5 w-5 text-${action.color}-600`} />
              </div>
              <span className="text-sm font-medium text-neutral-700">{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
