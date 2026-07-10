'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/providers/auth-provider';
import { UserRole } from '@/types';
import Button from '@/components/ui/Button';
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Stethoscope,
  Users,
  User,
  ArrowLeft,
  Check,
  Info,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleOption {
  id: UserRole;
  label: string;
  recommendation: string;
  requirement: string;
  icon: typeof Shield;
}

const ROLES: RoleOption[] = [
  {
    id: UserRole.ADMIN,
    label: 'Administrator',
    recommendation: 'Full system administration — manage users, clinics, and system settings.',
    requirement: 'Requires admin-level access granted by the organization.',
    icon: Shield,
  },
  {
    id: UserRole.DOCTOR,
    label: 'Doctor',
    recommendation: 'Clinical care — diagnose conditions, prescribe treatments, and manage patient recovery.',
    requirement: 'Requires a valid medical license and registration.',
    icon: Stethoscope,
  },
  {
    id: UserRole.NURSE,
    label: 'Nurse',
    recommendation: 'Patient care — triage, monitor vitals, administer medications, and support doctors.',
    requirement: 'Requires nursing certification and registration.',
    icon: Users,
  },
  {
    id: UserRole.CHW,
    label: 'Community Health Worker',
    recommendation: 'Community health — conduct field visits, educate patients, and report to clinics.',
    requirement: 'Requires CHW training and community assignment.',
    icon: User,
  },
  {
    id: UserRole.PATIENT,
    label: 'Patient',
    recommendation: 'Personal health — view your records, appointments, and educational content.',
    requirement: 'Requires registration at a partner clinic.',
    icon: HeartPulse,
  },
];

const ROLE_PASSWORD_HINTS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Admin@123',
  [UserRole.DOCTOR]: 'Doctor@123',
  [UserRole.NURSE]: 'Nurse@123',
  [UserRole.RECEPTIONIST]: 'Reception@123',
  [UserRole.PHARMACIST]: 'Pharmacy@123',
  [UserRole.LAB_STAFF]: 'Lab@123',
  [UserRole.DATA_MANAGER]: 'Data@123',
  [UserRole.CHW]: 'Chw@123',
  [UserRole.PATIENT]: 'Patient@123',
  [UserRole.FAMILY]: 'Family@123',
};

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
  if (!/[a-zA-Z]/.test(value)) return 'Password must contain at least one letter';
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
  return null;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.PATIENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const fieldErrors = {
    email: touched.email ? validateEmail(email) : null,
    password: touched.password ? validatePassword(password) : null,
    confirm:
      touched.confirm && confirmPassword !== password
        ? 'Passwords do not match'
        : null,
  };

  const isValid =
    !validateEmail(email) &&
    !validatePassword(password) &&
    confirmPassword === password;

  const passwordHint = ROLE_PASSWORD_HINTS[role];

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTouched({ email: true, password: true, confirm: true });
      if (!isValid) return;

      setIsLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        await register(email, password, role);
        setSuccessMessage('Account created successfully! Redirecting to sign in...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 1500);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, role, isValid, register, router],
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
                Join HutanoTrack
                <br />
                <span className="text-medical-200">Start Your Journey</span>
              </h2>
              <p className="text-medical-200/80 text-sm leading-relaxed mb-8">
                Create your account and select your role to get started with Zimbabwe&apos;s digital
                healthcare platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { label: 'Free for patients', sub: 'No registration fees' },
                { label: 'Secure & private', sub: 'Your data is protected' },
                { label: 'Offline-capable', sub: 'Works without internet' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-healthcare-400" />
                  <span className="text-white font-semibold text-sm">{stat.label}</span>
                  <span className="text-medical-200/60 text-sm">{stat.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-medical-200/40 text-xs"
          >
            &copy; {new Date().getFullYear()} HutanoTrack. All rights reserved.
          </motion.p>
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
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
            <div className="w-10 h-10 rounded-xl bg-medical-500 flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">HutanoTrack</h1>
              <p className="text-xs text-gray-400">Digital Healthcare for Zimbabwe</p>
            </div>
          </div>

          {/* Error banner */}
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
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Registration failed</p>
                  <p className="text-sm text-red-600 dark:text-red-300 mt-0.5">{errorMessage}</p>
                </div>
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 flex items-start gap-3 p-4 rounded-2xl border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
              >
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Success!</p>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-0.5">{successMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.push('/auth/login')}
                className="p-2 -ml-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create account</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Select your role and fill in your details.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Role selector */}
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                I want to register as <span className="text-red-400">*</span>
              </p>
              <div className="grid grid-cols-1 gap-2">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      disabled={isLoading}
                      onClick={() => setRole(r.id)}
                      className={cn(
                        'flex items-start gap-3 min-h-[56px] px-4 py-3 rounded-xl text-sm font-medium transition-all text-left w-full',
                        active
                          ? 'bg-medical-50 dark:bg-medical-900/20 text-medical-700 dark:text-medical-300 ring-2 ring-medical-400 dark:ring-medical-600'
                          : 'bg-white dark:bg-surface-dark-elevated text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-200 dark:border-gray-700 hover:border-gray-300',
                      )}
                    >
                      <div
                        className={cn(
                          'p-2 rounded-lg shrink-0 mt-0.5',
                          active
                            ? 'bg-medical-100 dark:bg-medical-800 text-medical-600 dark:text-medical-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400',
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight">{r.label}</p>
                        <p className="text-xs text-gray-400 leading-tight mt-0.5">{r.recommendation}</p>
                        <p className="text-xs text-amber-500 dark:text-amber-400 leading-tight mt-0.5">
                          {r.requirement}
                        </p>
                      </div>
                      {active && (
                        <div className="w-5 h-5 rounded-full bg-medical-500 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="reg-email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Email Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  disabled={isLoading}
                  autoComplete="email"
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

            {/* Password */}
            <div>
              <label
                htmlFor="reg-password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className={cn(
                    'w-full px-4 py-3 pl-10 pr-11 rounded-2xl border bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500',
                    fieldErrors.password
                      ? 'border-red-300 dark:border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-700',
                  )}
                  placeholder="Min 6 chars, letter + number"
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
              <div className="flex items-start gap-1.5 mt-1.5">
                <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  Recommended password for this role:{' '}
                  <span className="font-mono font-medium text-medical-500">{passwordHint}</span>
                </p>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-sm text-red-500">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="reg-confirm"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className={cn(
                    'w-full px-4 py-3 pl-10 pr-11 rounded-2xl border bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500',
                    fieldErrors.confirm
                      ? 'border-red-300 dark:border-red-500 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-gray-200 dark:border-gray-700',
                  )}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.confirm && (
                <p className="mt-1.5 text-sm text-red-500">{fieldErrors.confirm}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="w-full min-h-[44px]"
              size="lg"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          {/* Sign in link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/auth/login')}
                className="font-semibold text-medical-600 hover:text-medical-700 dark:text-medical-400 dark:hover:text-medical-300 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
