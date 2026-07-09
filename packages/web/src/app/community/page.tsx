'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Badge, RiskBadge } from '@/components/ui/Badge';
import { AreaChart } from '@/components/charts/AreaChart';
import { BarChart } from '@/components/charts/BarChart';
import { Users, Home, Activity, AlertTriangle } from 'lucide-react';

const villageData = [
  { name: 'Mbare', total: 245, red: 12, amber: 28, green: 205 },
  { name: 'Highfield', total: 180, red: 8, amber: 15, green: 157 },
  { name: 'Kuwadzana', total: 310, red: 15, amber: 32, green: 263 },
  { name: 'Budiriro', total: 195, red: 10, amber: 20, green: 165 },
  { name: 'Epworth', total: 220, red: 14, amber: 25, green: 181 },
  { name: 'Hatfield', total: 160, red: 6, amber: 12, green: 142 },
];

const adherenceData = [
  { name: 'Jan', value: 72 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 78 },
  { name: 'Apr', value: 74 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 82 },
  { name: 'Jul', value: 79 },
  { name: 'Aug', value: 85 },
  { name: 'Sep', value: 83 },
  { name: 'Oct', value: 87 },
  { name: 'Nov', value: 86 },
  { name: 'Dec', value: 88 },
];

export default function CommunityPage() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Community Health</h2>
          <p className="text-sm text-gray-500 mt-1">Village-level health statistics and community performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Villages" value="12" icon={<Home className="w-5 h-5" />} />
          <StatCard label="Total Patients" value="1,380" icon={<Users className="w-5 h-5" />} />
          <StatCard label="High Risk" value="65" icon={<AlertTriangle className="w-5 h-5" />} variant="danger" />
          <StatCard label="Avg. Adherence" value="82%" icon={<Activity className="w-5 h-5" />} variant="success" trend={6} trendLabel="vs last year" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Village Risk Distribution</CardTitle>
            </CardHeader>
            <div className="space-y-3">
              {villageData.map((v) => (
                <div key={v.name} className="flex items-center gap-4 p-2">
                  <span className="text-sm font-medium w-24 text-gray-700 dark:text-gray-300">{v.name}</span>
                  <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex">
                    <div
                      className="h-full bg-healthcare-500 transition-all"
                      style={{ width: `${(v.green / v.total) * 100}%` }}
                    />
                    <div
                      className="h-full bg-amber-500 transition-all"
                      style={{ width: `${(v.amber / v.total) * 100}%` }}
                    />
                    <div
                      className="h-full bg-red-500 transition-all"
                      style={{ width: `${(v.red / v.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-16 text-right">{v.total}</span>
                  <RiskBadge riskLevel={v.red > 10 ? 'red' : v.amber > 20 ? 'amber' : 'green'} />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medication Adherence Trends</CardTitle>
              <Badge variant="green">Improving</Badge>
            </CardHeader>
            <AreaChart data={adherenceData} color="#16a34a" height={280} />
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Community Health Workers</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Sarah Dube', village: 'Mbare', patients: 45, visits: 12 },
              { name: 'John Moyo', village: 'Highfield', patients: 38, visits: 9 },
              { name: 'Precious Ndlovu', village: 'Kuwadzana', patients: 52, visits: 15 },
              { name: 'Tafara Chikomo', village: 'Budiriro', patients: 41, visits: 10 },
              { name: 'Memory Gumbo', village: 'Epworth', patients: 35, visits: 8 },
              { name: 'Kudzai Mufambi', village: 'Hatfield', patients: 29, visits: 7 },
            ].map((chw) => (
              <div key={chw.name} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-medical-500 text-white flex items-center justify-center text-sm font-medium">
                    {chw.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{chw.name}</p>
                    <p className="text-xs text-gray-400">{chw.village}</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white dark:bg-gray-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{chw.patients}</p>
                    <p className="text-xs text-gray-400">Patients</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-gray-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{chw.visits}</p>
                    <p className="text-xs text-gray-400">Visits/Week</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
