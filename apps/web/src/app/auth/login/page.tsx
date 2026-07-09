'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, EyeOff, Phone, Lock } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement authentication
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-medical-600 via-medical-700 to-medical-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10 flex flex-col justify-between p-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">HutanoTrack</span>
            </div>
            <p className="text-medical-100 text-lg">Clinic Management Dashboard</p>
          </div>
          <div className="space-y-6">
            <blockquote className="text-white/80 text-lg italic leading-relaxed">
              "This platform has transformed how we manage chronic disease patients in our district. The offline capability is a game-changer."
            </blockquote>
            <div>
              <p className="text-white font-semibold">Dr. T. Chikwanha</p>
              <p className="text-medical-200 text-sm">Mashonaland Central Health District</p>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-medical-500/20 blur-3xl" />
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-healthcare-500/10 blur-3xl" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-medical-600 flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">HutanoTrack</span>
          </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome back</h1>
          <p className="text-neutral-500 mb-8">Sign in to access the clinic dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="+263 7X XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-medical-500 focus:outline-none focus:ring-2 focus:ring-medical-500/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-medical-500 focus:outline-none focus:ring-2 focus:ring-medical-500/20 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-medical-600 focus:ring-medical-500"
                />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-medical-600 hover:text-medical-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-medical-600 py-3.5 text-white font-semibold hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Need help?{' '}
            <button className="text-medical-600 hover:text-medical-700 font-medium">
              Contact support
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
