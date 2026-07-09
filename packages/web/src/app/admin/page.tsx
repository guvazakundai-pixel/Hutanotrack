'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Users, Shield, Building2, Activity, Plus, Settings } from 'lucide-react';

const tabs = [
  { id: 'users', label: 'Users' },
  { id: 'clinics', label: 'Clinics' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'audit', label: 'Audit Logs' },
  { id: 'system', label: 'System Settings' },
];

const users = [
  { id: 1, name: 'Dr. Tariro Moyo', email: 'tariro.moyo@clinic.co.zw', role: 'Admin', status: 'active' as const, lastLogin: '2024-01-15 08:30' },
  { id: 2, name: 'Nurse Sarah Dube', email: 'sarah.dube@clinic.co.zw', role: 'Nurse', status: 'active' as const, lastLogin: '2024-01-15 07:45' },
  { id: 3, name: 'John Ndlovu', email: 'john.ndlovu@clinic.co.zw', role: 'Receptionist', status: 'active' as const, lastLogin: '2024-01-14 16:20' },
  { id: 4, name: 'Pharmacist Tafara', email: 'tafara@clinic.co.zw', role: 'Pharmacist', status: 'inactive' as const, lastLogin: '2024-01-10 12:00' },
  { id: 5, name: 'Lab Tech Memory', email: 'memory@clinic.co.zw', role: 'Lab Staff', status: 'active' as const, lastLogin: '2024-01-15 08:00' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Administration</h2>
            <p className="text-sm text-gray-500 mt-1">Manage users, clinics, and system settings</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Users" value="24" icon={<Users className="w-5 h-5" />} />
          <StatCard label="Active Clinics" value="3" icon={<Building2 className="w-5 h-5" />} />
          <StatCard label="Roles" value="8" icon={<Shield className="w-5 h-5" />} />
          <StatCard label="System Health" value="98%" icon={<Activity className="w-5 h-5" />} variant="success" />
        </div>

        <Card>
          <CardHeader>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </CardHeader>

          {activeTab === 'users' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell><span className="font-medium text-gray-900 dark:text-gray-100">{u.name}</span></TableCell>
                    <TableCell><span className="text-sm">{u.email}</span></TableCell>
                    <TableCell><Badge variant="blue">{u.role}</Badge></TableCell>
                    <TableCell>
                      <Badge variant={u.status === 'active' ? 'green' : 'gray'}>
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell><span className="text-sm text-gray-500">{u.lastLogin}</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === 'system' && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">System Configuration</h4>
                  {[
                    { label: 'Language', value: 'English (Default)' },
                    { label: 'Session Timeout', value: '60 minutes' },
                    { label: 'Max Login Attempts', value: '5' },
                    { label: 'Offline Sync Interval', value: '30 seconds' },
                    { label: 'Data Retention', value: '7 years' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Backup & Recovery</h4>
                  {[
                    { label: 'Last Backup', value: 'Today 03:00 AM' },
                    { label: 'Backup Frequency', value: 'Daily' },
                    { label: 'Storage Location', value: 'AWS S3 (Encrypted)' },
                    { label: 'Retention Policy', value: '30 days' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
