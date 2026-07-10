'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/providers/auth-provider';
import Button from '@/components/ui/Button';
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  WifiOff,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return 'Enter a valid email address';
  }
  return null;
}

function validatePassword(value: string): string | null {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const fieldErrors = {
    email: touched.email ? validateEmail(email) : null,
    password: touched.password ? validatePassword(password) : null,
  };

  const isValid = !validateEmail(email) && !validatePassword(password);

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ email: true, password: true });
      if (!isValid) return;

      setIsLoading(true);
      setErrorMessage(null);

      try {
        await login(email, password);
        router.push('/dashboard');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Sign in failed. Please try again.';
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, isValid, login, router],
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-surface-dark">
      {/* Brand side */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] relative flex-col bg-gradient-to-br from-medical-600 via-medical-700 to-medical-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-medical-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-healthcare-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col h-full p-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">HutanoTrack</h1>
                <p className="text-medical-200 text-xs">Digital Healthcare for Zimbabwe</p>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-3xl font-bold text-white leading-tight mb-3">
                Keeping Communities
                <br />
                <span className="text-medical-200">Connected to Care</span>
              </h2>
              <p className="text-medical-200/80 text-sm leading-relaxed mb-8">
                A modern, secure digital healthcare platform purpose-built for Zimbabwe.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md min-w-0 break-words"
        >
          <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl bg-medical-500 flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">HutanoTrack</h1>
              <p className="text-xs text-gray-400">Digital Healthcare for Zimbabwe</p>
            </div>
          </div>

          <AnimatePresence>
            {isOffline && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 flex items-center gap-3 p-3 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
              >
                <WifiOff className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  You appear to be offline. An internet connection is required to sign in.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 flex items-start gap-3 p-4 rounded-2xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
              >
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Sign in failed</p>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-0.5">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sign in</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Sign in with your email and password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  disabled={isLoading}
                  autoComplete="username"
                  className={cn(
                    'w-full px-4 py-3 pl-10 rounded-2xl border bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500',
                    fieldErrors.email
                      ? 'border-red-300 dark:border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-700',
                  )}
                  placeholder="you@example.com"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-sm text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={cn(
                    'w-full px-4 py-3 pl-10 pr-11 rounded-2xl border bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500',
                    fieldErrors.password
                      ? 'border-red-300 dark:border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-700',
                  )}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-sm text-red-500">{fieldErrors.password}</p>
              )}
            </div>

            <Button type="submit" loading={isLoading} disabled={isLoading || isOffline} className="w-full min-h-[44px]" size="lg">
              {isLoading ? 'Signing in...' : 'Sign in'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              New to HutanoTrack?{' '}
              <button
                type="button"
                onClick={() => router.push('/auth/register')}
                className="font-semibold text-medical-600 hover:text-medical-700 dark:text-medical-400 dark:hover:text-medical-300 transition-colors"
              >
                Create an account
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
