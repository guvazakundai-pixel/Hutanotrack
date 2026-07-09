'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Tabs } from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import { Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const tabs = [
  { id: 'list', label: 'List View' },
  { id: 'calendar', label: 'Calendar' },
];

const appointments = [
  { id: 1, patient: 'Tendai Mukanya', type: 'Check-up', time: '09:00 AM', duration: '30 min', doctor: 'Dr. Moyo', status: 'confirmed' as const },
  { id: 2, patient: 'Chipo Dube', type: 'Follow-up', time: '10:30 AM', duration: '20 min', doctor: 'Dr. Moyo', status: 'scheduled' as const },
  { id: 3, patient: 'Blessing Ndlovu', type: 'Emergency Review', time: '11:00 AM', duration: '45 min', doctor: 'Dr. Moyo', status: 'in_progress' as const },
  { id: 4, patient: 'Rudo Moyo', type: 'Prenatal', time: '02:00 PM', duration: '30 min', doctor: 'Dr. Moyo', status: 'scheduled' as const },
  { id: 5, patient: 'Tafadzwa Chikomo', type: 'Consultation', time: '03:30 PM', duration: '30 min', doctor: 'Dr. Moyo', status: 'scheduled' as const },
  { id: 6, patient: 'Nyasha Gumbo', type: 'TB Review', time: '04:00 PM', duration: '20 min', doctor: 'Dr. Moyo', status: 'confirmed' as const },
];

const statusColors: Record<string, 'blue' | 'green' | 'amber' | 'gray' | 'purple'> = {
  scheduled: 'blue',
  confirmed: 'green',
  in_progress: 'amber',
  completed: 'purple',
  cancelled: 'gray',
  missed: 'amber',
};

export default function AppointmentsPage() {
  const [view, setView] = useState('list');

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Appointments</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and schedule patient appointments</p>
          </div>
          <Button>
            <Plus className="w-4 h-4" />
            New Appointment
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Tabs tabs={tabs} activeTab={view} onChange={setView} />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today</span>
            <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{apt.patient}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{apt.type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">{apt.time}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{apt.duration}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{apt.doctor}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[apt.status] || 'gray'}>
                      {apt.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
