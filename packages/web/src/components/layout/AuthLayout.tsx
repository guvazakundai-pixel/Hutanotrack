'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
const APP_NAME = 'HutanoTrack';
const TAGLINE = 'Keeping Communities Connected to Care';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 via-white to-healthcare-50 dark:from-surface-dark dark:via-surface-dark dark:to-surface-dark flex">
      {/* Brand Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-medical-500 to-medical-700 p-12 flex-col justify-between">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{APP_NAME}</h1>
              <p className="text-medical-200 text-sm">{TAGLINE}</p>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass bg-white/10 border-white/20 rounded-3xl p-6"
            >
              <p className="text-white/90 text-lg leading-relaxed">
                "A revolutionary healthcare platform designed for Zimbabwe and low-resource environments."
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10,000+', label: 'Patients' },
                { value: '500+', label: 'Clinics' },
                { value: '98%', label: 'Uptime' },
                { value: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass bg-white/5 border-white/10 rounded-2xl p-4 text-center"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-medical-200 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-medical-200 text-sm">
          <p>© 2024 {APP_NAME}. All rights reserved.</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-medical-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-healthcare-400/10 rounded-full blur-3xl" />
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-medical-500 flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{APP_NAME}</h1>
              <p className="text-xs text-gray-400">{TAGLINE}</p>
            </div>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
