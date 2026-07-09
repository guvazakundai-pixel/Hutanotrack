'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { SearchInput } from '@/components/ui/SearchInput';
import Button from '@/components/ui/Button';
import { FlaskConical, Clock, CheckCircle, AlertTriangle, Plus, Download } from 'lucide-react';
import { useState } from 'react';

const labRequests = [
  { id: 'LAB-001', patient: 'Tendai Mukanya', test: 'Blood Glucose Fasting', priority: 'routine' as const, status: 'completed' as const, requestedBy: 'Dr. Moyo', date: '2024-01-15', result: '7.8 mmol/L' },
  { id: 'LAB-002', patient: 'Chipo Dube', test: 'HbA1c', priority: 'routine' as const, status: 'processing' as const, requestedBy: 'Dr. Moyo', date: '2024-01-14', result: '-' },
  { id: 'LAB-003', patient: 'Blessing Ndlovu', test: 'Viral Load', priority: 'urgent' as const, status: 'completed' as const, requestedBy: 'Dr. Moyo', date: '2024-01-13', result: 'Undetectable' },
  { id: 'LAB-004', patient: 'Nyasha Gumbo', test: 'Sputum Smear', priority: 'urgent' as const, status: 'pending' as const, requestedBy: 'Dr. Moyo', date: '2024-01-12', result: '-' },
  { id: 'LAB-005', patient: 'Rudo Moyo', test: 'Blood Type', priority: 'routine' as const, status: 'completed' as const, requestedBy: 'Dr. Moyo', date: '2024-01-11', result: 'O+' },
  { id: 'LAB-006', patient: 'Tafadzwa Chikomo', test: 'Lipid Panel', priority: 'routine' as const, status: 'completed' as const, requestedBy: 'Dr. Moyo', date: '2024-01-10', result: 'Normal' },
  { id: 'LAB-007', patient: 'Shamiso Chikwanha', test: 'Creatinine', priority: 'routine' as const, status: 'pending' as const, requestedBy: 'Dr. Moyo', date: '2024-01-09', result: '-' },
];

export default function LaboratoryPage() {
  const [search, setSearch] = useState('');

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Laboratory</h2>
            <p className="text-sm text-gray-500 mt-1">Manage lab test requests and results</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary"><Download className="w-4 h-4" />Export</Button>
            <Button><Plus className="w-4 h-4" />New Request</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Tests" value="247" icon={<FlaskConical className="w-5 h-5" />} />
          <StatCard label="Pending" value="3" icon={<Clock className="w-5 h-5" />} variant="warning" />
          <StatCard label="Processing" value="1" icon={<AlertTriangle className="w-5 h-5" />} variant="warning" />
          <StatCard label="Completed" value="243" icon={<CheckCircle className="w-5 h-5" />} variant="success" />
        </div>

        <Card>
          <CardHeader>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name, test type, or ID..."
            />
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell><span className="text-sm font-medium text-gray-900 dark:text-gray-100">{req.id}</span></TableCell>
                  <TableCell><span className="text-sm">{req.patient}</span></TableCell>
                  <TableCell><span className="text-sm">{req.test}</span></TableCell>
                  <TableCell>
                    <Badge variant={req.priority === 'urgent' ? 'red' : 'blue'}>
                      {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell><span className="text-sm">{req.requestedBy}</span></TableCell>
                  <TableCell><span className="text-sm text-gray-500">{req.date}</span></TableCell>
                  <TableCell><span className="text-sm">{req.result}</span></TableCell>
                  <TableCell>
                    <Badge variant={req.status === 'completed' ? 'green' : req.status === 'processing' ? 'amber' : 'gray'}>
                      {req.status}
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
