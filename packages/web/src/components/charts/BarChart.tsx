'use client';

import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface BarChartProps {
  data: { name: string; value: number }[];
  color?: string;
  height?: number;
  horizontal?: boolean;
}

export function BarChart({ data, color = '#2563eb', height = 300, horizontal = false }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} layout={horizontal ? 'vertical' : 'horizontal'}>
        <XAxis
          type={horizontal ? 'number' : 'category'}
          dataKey={horizontal ? undefined : 'name'}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
        />
        <YAxis
          type={horizontal ? 'category' : 'number'}
          dataKey={horizontal ? 'name' : undefined}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        />
        <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
