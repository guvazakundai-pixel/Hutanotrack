'use client';

import Link from 'next/link';
import { HeartPulse, Activity, Shield, Users, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const APP_NAME = 'HutanoTrack';
const TAGLINE = 'Keeping Communities Connected to Care';

export default function LandingPage() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-medical-500 flex items-center justify-center">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">{APP_NAME}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#about" className="text-sm text-gray-600 hover:text-gray-900">About</a>
            <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            <Link href="/auth/login" className="text-sm font-medium text-medical-600 hover:text-medical-700">Sign In</Link>
            <Link href="/auth/login" className="text-sm font-medium bg-medical-500 text-white px-4 py-2 rounded-xl hover:bg-medical-600 transition-colors">Get Started</Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-100 px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-gray-600">Features</a>
            <a href="#about" className="block text-sm text-gray-600">About</a>
            <a href="#contact" className="block text-sm text-gray-600">Contact</a>
            <Link href="/auth/login" className="block text-sm font-medium text-medical-600">Sign In</Link>
            <Link href="/auth/login" className="block text-sm font-medium bg-medical-500 text-white px-4 py-2 rounded-xl text-center">Get Started</Link>
          </div>
        )}
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-medical-50 rounded-full text-sm text-medical-700 font-medium mb-8">
            <Activity className="w-4 h-4" />
            Digital Healthcare for Zimbabwe
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {TAGLINE}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            A modern, offline-first digital healthcare platform designed for low-resource environments.
            Manage chronic diseases, track patient health, and keep communities connected to care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-medical-500 text-white font-semibold rounded-2xl hover:bg-medical-600 transition-colors shadow-lg shadow-medical-500/25"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything you need to manage community health</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Offline-first, multi-lingual, and designed for low-resource environments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: HeartPulse, title: 'Patient Management', desc: 'Track patients, vitals, medications, and appointments with an intuitive dashboard.' },
              { icon: Shield, title: 'Offline-First', desc: 'Works without internet. Syncs automatically when connection is restored.' },
              { icon: Users, title: 'Community Care', desc: 'Connect patients, CHWs, clinics, and families in one platform.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-elevated transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-medical-50 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-medical-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Built for Zimbabwe</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              HutanoTrack was built specifically for the Zimbabwean healthcare system. With support for
              English, Shona, and Ndebele, offline-first architecture, and integration with existing
              clinic workflows, it helps bridge the gap between communities and quality healthcare.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              {[
                { value: 'Shona', label: 'Language' },
                { value: 'Ndebele', label: 'Language' },
                { value: 'English', label: 'Language' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-medical-600">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-medical-600 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm">&copy; 2024 {APP_NAME}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
