'use client';

import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTheme } from '@/providers/theme-provider';
import { useAuth } from '@/providers/auth-provider';
import { Sun, Moon, Bell, Shield, Globe, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="First Name" defaultValue={user?.firstName} />
            <Input label="Last Name" defaultValue={user?.lastName} />
            <Input label="Phone Number" defaultValue={user?.phone} type="tel" />
            <Input label="Email" defaultValue={user?.email} type="email" />
          </div>
          <div className="mt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                  {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</p>
                  <p className="text-xs text-gray-400">Toggle between light and dark theme</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  theme === 'dark' ? 'bg-medical-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {[
              { icon: Globe, label: 'Language', description: 'English (Zimbabwe)', hasToggle: false },
              { icon: Bell, label: 'Notifications', description: 'Push, SMS, and Email', hasToggle: false },
              { icon: Shield, label: 'Two-Factor Auth', description: 'Add extra security', hasToggle: true, enabled: true },
              { icon: Smartphone, label: 'Biometric Login', description: 'Use fingerprint or face ID', hasToggle: true, enabled: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                    <item.icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </div>
                {item.hasToggle && (
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      item.enabled ? 'bg-medical-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <div className="space-y-3">
            {[
              { label: 'Appointment Reminders', enabled: true },
              { label: 'Medication Reminders', enabled: true },
              { label: 'Emergency Alerts', enabled: true },
              { label: 'Weekly Health Summary', enabled: false },
              { label: 'Refill Notifications', enabled: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                <button
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    item.enabled ? 'bg-medical-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      item.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
