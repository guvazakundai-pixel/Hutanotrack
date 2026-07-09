'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { HeartPulse, Bell } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/providers/auth-provider';

export function WelcomeCard() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-medical-500 to-medical-700 text-white border-0 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-healthcare-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{greeting}, {user ? `${user.firstName} ${user.lastName}` : 'Dr. Moyo'}</h2>
              <p className="text-medical-100 mt-1">
                Here's your clinic overview for today.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur">
              <HeartPulse className="w-6 h-6" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 border-0"
            >
              <Bell className="w-4 h-4" />
              View Reminders
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: 'Pending Tasks', value: '12' },
              { label: 'New Patients', value: '5' },
              { label: 'Alerts', value: '3' },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-2xl bg-white/5">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-medical-200 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
