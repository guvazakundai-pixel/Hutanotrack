'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge, RiskBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { LineChart } from '@/components/charts/LineChart';
import {
  Phone, Mail, MapPin, Calendar, Activity, Heart,
  Droplets, Weight, Thermometer, Edit3,
  MessageSquare, FileText, AlertTriangle,
} from 'lucide-react';

const patient = {
  id: '1', firstName: 'Tendai', lastName: 'Mukanya',
  phone: '+263 712 345 678', email: 'tendai.m@email.com',
  age: 45, gender: 'Male', village: 'Mbare', district: 'Harare',
  disease: 'Diabetes Type 2', riskLevel: 'amber' as const,
  enrolledAt: '2023-06-15', chwName: 'Sarah Dube',
  lastReadings: { bp: '138/88', glucose: '7.8', heartRate: '82', weight: '78' },
};

const bpData = [
  { name: 'Mon', value: 135, value2: 85 },
  { name: 'Tue', value: 142, value2: 90 },
  { name: 'Wed', value: 138, value2: 88 },
  { name: 'Thu', value: 145, value2: 92 },
  { name: 'Fri', value: 140, value2: 86 },
  { name: 'Sat', value: 136, value2: 84 },
  { name: 'Sun', value: 138, value2: 88 },
];

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'vitals', label: 'Vitals' },
  { id: 'medications', label: 'Medications' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'referrals', label: 'Referrals' },
  { id: 'notes', label: 'Notes' },
];

export default function PatientDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        {/* Patient Header */}
        <Card>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar firstName={patient.firstName} lastName={patient.lastName} size="xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {patient.firstName} {patient.lastName}
                </h2>
                <RiskBadge riskLevel={patient.riskLevel} />
                <Badge variant="blue">{patient.disease}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500"><Phone className="w-4 h-4" />{patient.phone}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500"><MapPin className="w-4 h-4" />{patient.village}, {patient.district}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500"><Calendar className="w-4 h-4" />{patient.age} years • {patient.gender}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500"><Activity className="w-4 h-4" />CHW: {patient.chwName}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm"><Edit3 className="w-4 h-4" />Edit</Button>
              <Button variant="secondary" size="sm"><MessageSquare className="w-4 h-4" />Message</Button>
            </div>
          </div>
        </Card>

        {/* Vitals Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Blood Pressure', value: patient.lastReadings.bp, icon: Heart, variant: 'default' as const },
            { label: 'Blood Glucose', value: `${patient.lastReadings.glucose} mmol/L`, icon: Droplets, variant: 'warning' as const },
            { label: 'Heart Rate', value: `${patient.lastReadings.heartRate} bpm`, icon: Activity, variant: 'success' as const },
            { label: 'Weight', value: `${patient.lastReadings.weight} kg`, icon: Weight, variant: 'default' as const },
          ].map((stat) => (
            <Card key={stat.label} padding="sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  stat.variant === 'warning' ? 'bg-amber-50 text-amber-500' :
                  stat.variant === 'success' ? 'bg-healthcare-50 text-healthcare-500' :
                  'bg-medical-50 text-medical-500'
                }`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Card>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <CardContent>
                  <CardTitle className="mb-4">Blood Pressure Trend (7 Days)</CardTitle>
                  <LineChart
                    data={bpData}
                    lines={[
                      { key: 'value', color: '#2563eb', name: 'Systolic' },
                      { key: 'value2', color: '#16a34a', name: 'Diastolic' },
                    ]}
                    height={250}
                  />
                </CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { icon: AlertTriangle, text: 'Blood pressure trending upward. Consider medication adjustment.', severity: 'warning' },
                        { icon: Activity, text: 'Adherence rate at 72% - below target of 80%', severity: 'info' },
                        { icon: FileText, text: 'Next appointment in 3 days - follow-up on glucose levels', severity: 'info' },
                      ].map((insight, i) => (
                        <div key={i} className={`p-3 rounded-2xl ${
                          insight.severity === 'warning' ? 'bg-amber-50 dark:bg-amber-900/10' : 'bg-medical-50 dark:bg-medical-900/10'
                        }`}>
                          <div className="flex gap-2">
                            <insight.icon className={`w-4 h-4 mt-0.5 ${
                              insight.severity === 'warning' ? 'text-amber-500' : 'text-medical-500'
                            }`} />
                            <p className="text-sm text-gray-700 dark:text-gray-300">{insight.text}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Medication Adherence</CardTitle></CardHeader>
                    <CardContent>
                      {[
                        { name: 'Metformin 500mg', adherence: 75, status: 'Active' },
                        { name: 'Lisinopril 10mg', adherence: 68, status: 'Active' },
                        { name: 'Aspirin 81mg', adherence: 90, status: 'Active' },
                      ].map((med) => (
                        <div key={med.name} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{med.name}</p>
                            <p className="text-xs text-gray-400">{med.status}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-semibold ${
                              med.adherence >= 80 ? 'text-healthcare-500' : med.adherence >= 50 ? 'text-amber-500' : 'text-red-500'
                            }`}>
                              {med.adherence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
