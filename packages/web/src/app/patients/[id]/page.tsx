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
  MessageSquare, FileText, AlertTriangle, Clock,
  CheckCircle, XCircle, Syringe, User,
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

const vitalsHistory = [
  { date: '2024-01-15', bp: '138/88', glucose: '7.8', heartRate: 82, temp: '36.8', weight: 78, o2: '98%' },
  { date: '2024-01-08', bp: '142/90', glucose: '8.2', heartRate: 85, temp: '36.9', weight: 78.5, o2: '97%' },
  { date: '2024-01-01', bp: '140/86', glucose: '7.5', heartRate: 80, temp: '36.7', weight: 79, o2: '98%' },
  { date: '2023-12-25', bp: '145/92', glucose: '8.5', heartRate: 88, temp: '37.0', weight: 79.2, o2: '97%' },
  { date: '2023-12-18', bp: '136/84', glucose: '7.2', heartRate: 78, temp: '36.6', weight: 78.8, o2: '99%' },
  { date: '2023-12-11', bp: '138/85', glucose: '7.6', heartRate: 81, temp: '36.8', weight: 78.3, o2: '98%' },
  { date: '2023-12-04', bp: '140/88', glucose: '7.9', heartRate: 83, temp: '36.7', weight: 78, o2: '98%' },
];

const medications = [
  { id: 1, name: 'Metformin 500mg', dosage: '1 tablet', frequency: 'Twice daily', route: 'Oral', startDate: '2023-06-15', endDate: '', status: 'Active', adherence: 75 },
  { id: 2, name: 'Lisinopril 10mg', dosage: '1 tablet', frequency: 'Once daily', route: 'Oral', startDate: '2023-06-15', endDate: '', status: 'Active', adherence: 68 },
  { id: 3, name: 'Aspirin 81mg', dosage: '1 tablet', frequency: 'Once daily', route: 'Oral', startDate: '2023-06-15', endDate: '', status: 'Active', adherence: 90 },
  { id: 4, name: 'Atorvastatin 20mg', dosage: '1 tablet', frequency: 'Once daily', route: 'Oral', startDate: '2023-08-01', endDate: '2024-01-31', status: 'Completed', adherence: 100 },
];

const appointments = [
  { id: 1, type: 'Check-up', date: '2024-01-20', time: '09:00', doctor: 'Dr. Moyo', location: 'Room 3', status: 'scheduled' as const },
  { id: 2, type: 'Follow-up', date: '2024-01-10', time: '10:30', doctor: 'Dr. Moyo', location: 'Room 3', status: 'completed' as const },
  { id: 3, type: 'Blood Test', date: '2024-01-03', time: '08:00', doctor: 'Lab Staff', location: 'Lab 1', status: 'completed' as const },
  { id: 4, type: 'Review', date: '2023-12-15', time: '14:00', doctor: 'Dr. Moyo', location: 'Room 3', status: 'missed' as const },
];

const referrals = [
  { id: 1, from: 'Mbare Clinic', to: 'Parirenyatwa Hospital', reason: 'Specialist consultation', date: '2024-01-10', status: 'Pending' },
  { id: 2, from: 'Mbare Clinic', to: 'Harare Central Hospital', reason: 'Eye exam', date: '2023-12-05', status: 'Completed' },
];

export default function PatientDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full space-y-6 min-w-0">
        {/* Patient Header */}
        <Card>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar firstName={patient.firstName} lastName={patient.lastName} size="xl" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 break-words">
                  {patient.firstName} {patient.lastName}
                </h2>
                <RiskBadge riskLevel={patient.riskLevel} />
                <Badge variant="blue">{patient.disease}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0"><Phone className="w-4 h-4 shrink-0" /><span className="truncate">{patient.phone}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0"><MapPin className="w-4 h-4 shrink-0" /><span className="truncate">{patient.village}, {patient.district}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0"><Calendar className="w-4 h-4 shrink-0" /><span className="truncate">{patient.age} years &middot; {patient.gender}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0"><Activity className="w-4 h-4 shrink-0" /><span className="truncate">CHW: {patient.chwName}</span></div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="secondary" size="sm" className="min-h-[44px]"><Edit3 className="w-4 h-4" />Edit</Button>
              <Button variant="secondary" size="sm" className="min-h-[44px]"><MessageSquare className="w-4 h-4" />Message</Button>
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
                <div className={`p-2 rounded-xl shrink-0 ${
                  stat.variant === 'warning' ? 'bg-amber-50 text-amber-500' :
                  stat.variant === 'success' ? 'bg-healthcare-50 text-healthcare-500' :
                  'bg-medical-50 text-medical-500'
                }`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{stat.value}</p>
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
                            <insight.icon className={`w-4 h-4 mt-0.5 shrink-0 ${
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
                      {medications.slice(0, 3).map((med) => (
                        <div key={med.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{med.name}</p>
                            <p className="text-xs text-gray-400">{med.status}</p>
                          </div>
                          <div className="text-right shrink-0 ml-4">
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
            {activeTab === 'vitals' && (
              <CardContent>
                <CardTitle className="mb-4">Vitals History (Last 7 Recordings)</CardTitle>
                <div className="overflow-x-auto min-w-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">BP</th>
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">Glucose</th>
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">HR</th>
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">Temp</th>
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">Weight</th>
                        <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 uppercase">O2 Sat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                      {vitalsHistory.map((v) => (
                        <tr key={v.date} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="px-3 py-3 text-gray-900 dark:text-gray-100 whitespace-nowrap">{v.date}</td>
                          <td className="px-3 py-3">{v.bp}</td>
                          <td className="px-3 py-3">{v.glucose}</td>
                          <td className="px-3 py-3">{v.heartRate}</td>
                          <td className="px-3 py-3">{v.temp}&deg;C</td>
                          <td className="px-3 py-3">{v.weight} kg</td>
                          <td className="px-3 py-3">{v.o2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
            {activeTab === 'medications' && (
              <CardContent>
                <CardTitle className="mb-4">Current & Past Medications</CardTitle>
                <div className="space-y-3">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div className="p-2 rounded-xl bg-medical-50 dark:bg-medical-900/20 text-medical-500 shrink-0">
                        <Syringe className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium text-gray-900 dark:text-gray-100">{med.name}</p>
                          <Badge variant={med.status === 'Active' ? 'green' : 'gray'}>{med.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{med.dosage} &middot; {med.frequency} &middot; {med.route}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{med.startDate}{med.endDate ? ` to ${med.endDate}` : ''}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-lg font-bold ${
                          med.adherence >= 80 ? 'text-healthcare-500' : med.adherence >= 50 ? 'text-amber-500' : 'text-red-500'
                        }`}>{med.adherence}%</p>
                        <p className="text-xs text-gray-400">adherence</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
            {activeTab === 'appointments' && (
              <CardContent>
                <CardTitle className="mb-4">Appointment History</CardTitle>
                <div className="space-y-2">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        apt.status === 'completed' ? 'bg-healthcare-50 text-healthcare-500' :
                        apt.status === 'scheduled' ? 'bg-medical-50 text-medical-500' :
                        'bg-red-50 text-red-500'
                      }`}>
                        {apt.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                         apt.status === 'scheduled' ? <Clock className="w-4 h-4" /> :
                         <XCircle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{apt.type}</p>
                        <p className="text-xs text-gray-500">{apt.doctor} &middot; {apt.location}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{apt.date}</p>
                        <p className="text-xs text-gray-400">{apt.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
            {activeTab === 'referrals' && (
              <CardContent>
                <CardTitle className="mb-4">Referral History</CardTitle>
                <div className="space-y-3">
                  {referrals.map((ref) => (
                    <div key={ref.id} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{ref.to}</p>
                        <p className="text-sm text-gray-500">{ref.reason}</p>
                        <p className="text-xs text-gray-400 mt-0.5">From: {ref.from} &middot; {ref.date}</p>
                      </div>
                      <Badge variant={ref.status === 'Completed' ? 'green' : 'amber'}>{ref.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
            {activeTab === 'notes' && (
              <CardContent>
                <CardTitle className="mb-4">Clinical Notes</CardTitle>
                <div className="space-y-4">
                  {[
                    { date: '2024-01-15', author: 'Dr. Moyo', note: 'Patient reports feeling well. BP slightly elevated at 138/88. Continue current medication. Follow-up in 2 weeks.', type: 'clinical' },
                    { date: '2024-01-08', author: 'Nurse Chipo', note: 'Blood glucose at 8.2 mmol/L - elevated. Patient advised on dietary restrictions. Will monitor.', type: 'nursing' },
                    { date: '2024-01-01', author: 'CHW Sarah', note: 'Home visit conducted. Patient is compliant with medication. Blood pressure stable.', type: 'chw' },
                  ].map((n, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{n.author}</span>
                          <Badge variant={n.type === 'clinical' ? 'blue' : n.type === 'nursing' ? 'purple' : 'green'} size="sm">
                            {n.type}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400">{n.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{n.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
