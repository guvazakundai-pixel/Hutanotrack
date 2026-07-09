'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge, RiskBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Heart, CalendarCheck, Activity, MessageSquare } from 'lucide-react';

const familyMembers = [
  { id: 1, firstName: 'Tendai', lastName: 'Mukanya', relationship: 'Father', riskLevel: 'amber' as const, adherence: 72, lastAppointment: '2024-01-15', nextAppointment: '2024-02-01' },
  { id: 2, firstName: 'Chipo', lastName: 'Mukanya', relationship: 'Mother', riskLevel: 'green' as const, adherence: 88, lastAppointment: '2024-01-10', nextAppointment: '2024-02-15' },
  { id: 3, firstName: 'Nyasha', lastName: 'Mukanya', relationship: 'Sibling', riskLevel: 'red' as const, adherence: 55, lastAppointment: '2024-01-12', nextAppointment: '2024-01-20' },
];

export default function FamilyPortalPage() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Family Portal</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor and support your family members' health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {familyMembers.map((member) => (
            <Card key={member.id} hover>
              <div className="flex items-start gap-4">
                <Avatar firstName={member.firstName} lastName={member.lastName} size="lg" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {member.firstName} {member.lastName}
                    </h3>
                    <RiskBadge riskLevel={member.riskLevel} />
                  </div>
                  <p className="text-sm text-gray-500">{member.relationship}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <Activity className="w-4 h-4 text-medical-500 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{member.adherence}%</p>
                  <p className="text-xs text-gray-400">Adherence</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <CalendarCheck className="w-4 h-4 text-healthcare-500 mx-auto mb-1" />
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{member.lastAppointment}</p>
                  <p className="text-xs text-gray-400">Last Visit</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <CalendarCheck className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{member.nextAppointment}</p>
                  <p className="text-xs text-gray-400">Next Visit</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 px-3 rounded-xl bg-medical-50 dark:bg-medical-900/20 text-medical-600 dark:text-medical-400 text-sm font-medium hover:bg-medical-100 dark:hover:bg-medical-900/30 transition-colors">
                  <Heart className="w-4 h-4 inline mr-1" />
                  Encourage
                </button>
                <button className="flex-1 py-2 px-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Message
                </button>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            {familyMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <Avatar firstName={member.firstName} lastName={member.lastName} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.firstName} {member.lastName}</p>
                  <p className="text-xs text-gray-400">Adherence Rate</p>
                </div>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        member.adherence >= 80 ? 'bg-healthcare-500' :
                        member.adherence >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${member.adherence}%` }}
                    />
                  </div>
                </div>
                <span className={`text-sm font-semibold ${
                  member.adherence >= 80 ? 'text-healthcare-500' :
                  member.adherence >= 50 ? 'text-amber-500' : 'text-red-500'
                }`}>{member.adherence}%</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
