'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar, Bell, Activity, Shield, ChevronRight } from 'lucide-react';

export default function FamilyPortalHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-600 to-medical-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">HutanoTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/80 hover:text-white transition-colors">Sign In</button>
            <button className="px-5 py-2.5 bg-white text-medical-700 rounded-xl font-medium hover:bg-medical-50 transition-colors">
              Get Started
            </button>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Stay Connected to<br />
              <span className="text-medical-200">Their Care Journey</span>
            </h1>
            <p className="text-lg text-medical-100 mb-8 leading-relaxed">
              Monitor your loved one's health, receive important updates, and support their treatment journey — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-medical-700 rounded-2xl font-semibold hover:shadow-lg transition-all">
                Connect to a Patient
              </button>
              <button className="px-6 py-3 bg-white/10 text-white rounded-2xl font-medium hover:bg-white/20 transition-all border border-white/20">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { icon: Heart, label: 'Medication Adherence', desc: 'Track if medications are being taken on time' },
              { icon: Calendar, label: 'Appointment updates', desc: 'Get notified about upcoming clinic visits' },
              { icon: Activity, label: 'Health Trends', desc: 'View blood pressure and glucose trends over time' },
              { icon: Shield, label: 'Privacy First', desc: 'Only see what the patient has approved' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/10">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{feature.label}</h3>
                  <p className="text-medical-200 text-sm">{feature.desc}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-white/40" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
