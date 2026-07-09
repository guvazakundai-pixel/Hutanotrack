'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { PieChart } from '@/components/charts/PieChart';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { TrendingUp, Users, Activity, CheckCircle } from 'lucide-react';

const riskData = [
  { name: 'Stable', value: 920, color: '#16a34a' },
  { name: 'Needs Attention', value: 320, color: '#f59e0b' },
  { name: 'High Risk', value: 140, color: '#dc2626' },
];

const monthlyPatients = [
  { name: 'Jan', value: 110 }, { name: 'Feb', value: 135 }, { name: 'Mar', value: 125 },
  { name: 'Apr', value: 150 }, { name: 'May', value: 165 }, { name: 'Jun', value: 155 },
  { name: 'Jul', value: 170 }, { name: 'Aug', value: 190 }, { name: 'Sep', value: 175 },
  { name: 'Oct', value: 210 }, { name: 'Nov', value: 225 }, { name: 'Dec', value: 240 },
];

const controlRates = [
  { name: 'BP Control', value: 68 },
  { name: 'Diabetes Control', value: 72 },
  { name: 'HIV Viral Suppression', value: 91 },
  { name: 'TB Treatment Success', value: 85 },
  { name: 'Maternal Health', value: 78 },
];

const adherenceTrend = [
  { name: 'Week 1', value: 72, value2: 65 },
  { name: 'Week 2', value: 75, value2: 68 },
  { name: 'Week 3', value: 78, value2: 70 },
  { name: 'Week 4', value: 74, value2: 72 },
  { name: 'Week 5', value: 80, value2: 75 },
  { name: 'Week 6', value: 82, value2: 78 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">Comprehensive insights and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Patient Growth" value="+18%" icon={<TrendingUp className="w-5 h-5" />} trend={18} trendLabel="this year" variant="success" />
          <StatCard label="Avg. Adherence" value="82%" icon={<Activity className="w-5 h-5" />} variant="success" />
          <StatCard label="Referral Completion" value="94%" icon={<CheckCircle className="w-5 h-5" />} variant="success" />
          <StatCard label="Active Patients" value="1,380" icon={<Users className="w-5 h-5" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Risk Distribution</CardTitle>
            </CardHeader>
            <PieChart data={riskData} height={300} />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Patients (Monthly)</CardTitle>
              <span className="text-sm text-healthcare-500 font-medium">+12%</span>
            </CardHeader>
            <BarChart data={monthlyPatients} color="#2563eb" height={300} />
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Disease Control Rates</CardTitle>
            </CardHeader>
            <BarChart data={controlRates} color="#16a34a" height={300} horizontal />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adherence Comparison</CardTitle>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-medical-500" /> Current</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300" /> Target</span>
              </div>
            </CardHeader>
            <LineChart
              data={adherenceTrend}
              lines={[
                { key: 'value', color: '#2563eb', name: 'Current' },
                { key: 'value2', color: '#94a3b8', name: 'Target' },
              ]}
              height={300}
            />
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
