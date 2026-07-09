'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Building2, Activity, Settings, Database, Bell, Globe } from 'lucide-react';

const adminModules = [
  { icon: Users, label: 'User Management', desc: 'Manage users, roles, and permissions', count: '156 users' },
  { icon: Building2, label: 'Clinics & Facilities', desc: 'Manage clinics, districts, and facilities', count: '12 clinics' },
  { icon: Activity, label: 'System Health', desc: 'Monitor system performance and uptime', count: '99.9% uptime' },
  { icon: Database, label: 'Backup & Recovery', desc: 'Configure backups and disaster recovery', count: 'Last: 2h ago' },
  { icon: Bell, label: 'Notifications', desc: 'Configure SMS, email, and push notifications', count: '3 channels' },
  { icon: Globe, label: 'Localization', desc: 'Manage languages and translations', count: '3 languages' },
  { icon: Shield, label: 'Audit Logs', desc: 'View system audit trail and security logs', count: '12k entries' },
  { icon: Settings, label: 'System Settings', desc: 'Configure global system settings', count: '24 settings' },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-medical-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Administration</h1>
              <p className="text-neutral-400 text-sm">System management and configuration</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-healthcare-500 animate-pulse" />
            <span className="text-sm text-neutral-400">All systems operational</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: '156', change: '+12 this month' },
            { label: 'Active Clinics', value: '12', change: '100% online' },
            { label: 'Registered Patients', value: '12,847', change: '+234 this week' },
            { label: 'CHWs Deployed', value: '89', change: 'Across 6 districts' },
          ].map((stat) => (
            <div key={stat.label} className="bg-neutral-800/50 rounded-2xl border border-neutral-700 p-5">
              <p className="text-sm text-neutral-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              <p className="text-xs text-neutral-500 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminModules.map((module, i) => {
            const Icon = module.icon;
            return (
              <motion.button
                key={module.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="text-left bg-neutral-800/30 hover:bg-neutral-800/60 rounded-2xl border border-neutral-700/50 p-5 transition-all duration-200 group"
              >
                <div className="h-10 w-10 rounded-xl bg-medical-900/50 flex items-center justify-center mb-4 group-hover:bg-medical-900/70 transition-colors">
                  <Icon className="h-5 w-5 text-medical-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">{module.label}</h3>
                <p className="text-sm text-neutral-400 mb-3">{module.desc}</p>
                <p className="text-xs text-medical-400">{module.count}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
