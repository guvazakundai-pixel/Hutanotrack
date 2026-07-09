'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AuthLayout } from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/providers/auth-provider';
import { Phone, Lock, Smartphone, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithOtp } = useAuth();
  const [method, setMethod] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (method === 'phone') {
        await login(phone, password);
      } else {
        if (!showOtpInput) {
          setShowOtpInput(true);
          setLoading(false);
          return;
        }
        await loginWithOtp(phone, otp);
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to your account</p>
        </div>

        {/* Method toggle */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <button
            onClick={() => { setMethod('phone'); setShowOtpInput(false); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              method === 'phone'
                ? 'bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Password
          </button>
          <button
            onClick={() => { setMethod('otp'); setShowOtpInput(false); }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
              method === 'otp'
                ? 'bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Smartphone className="w-4 h-4 inline mr-2" />
            OTP
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+263 712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="w-4 h-4" />}
            required
          />

          {method === 'phone' ? (
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />
          ) : showOtpInput ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Input
                label="OTP Code"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </motion.div>
          ) : null}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            {method === 'otp' && !showOtpInput ? 'Send OTP' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {method === 'phone' && (
          <div className="text-center">
            <button className="text-sm text-medical-500 hover:text-medical-600 font-medium">
              Forgot password?
            </button>
          </div>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white dark:bg-surface-dark px-3 text-gray-400">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" size="lg" onClick={() => {}}>
          <Smartphone className="w-4 h-4" />
          Biometric Login
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <button className="text-medical-500 hover:text-medical-600 font-medium">Register</button>
        </p>
      </div>
    </AuthLayout>
  );
}
