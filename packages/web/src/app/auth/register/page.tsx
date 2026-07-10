'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
  Building2,
  ArrowLeft,
  Check,
  ArrowRight,
  Search,
  Loader2,
  Calendar,
  Phone,
  MapPin,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ZIMBABWE_DISTRICTS = [
  'Harare', 'Bulawayo', 'Chitungwiza', 'Mutare', 'Gweru', 'Kwekwe',
  'Kadoma', 'Masvingo', 'Chinhoyi', 'Marondera', 'Bindura', 'Hwange',
  'Beitbridge', 'Victoria Falls', 'Rusape', 'Chipinge', 'Zvishavane',
  'Chegutu', 'Kariba', 'Karoi', 'Norton', 'Epworth', 'Ruwa',
  'Murewa', 'Mudzi', 'Goromonzi', 'Seke', 'Mhondoro', 'Zvimba',
  'Makonde', 'Hurungwe', 'Gokwe', 'Lupane', 'Nkayi', 'Tsholotsho',
  'Mwenezi', 'Chiredzi', 'Bikita', 'Gutu', 'Shurugwi', 'Chirumhanzu',
];

interface ClinicResult {
  id: string;
  clinicName: string;
  physicalAddress: string;
  provincialDistrict: string;
  registrationNumber: string;
}

type Step = 'role' | 'details' | 'account' | 'success';

const ROLE_CARDS = [
  {
    id: UserRole.CLINIC_OWNER,
    label: 'Clinic Owner',
    description: 'Register your clinic and manage healthcare services.',
    requirement: 'Requires valid Ministry of Health clinic registration number.',
    icon: Building2,
  },
  {
    id: UserRole.DOCTOR,
    label: 'Doctor',
    description: 'Diagnose patients, prescribe treatments, manage clinical care.',
    requirement: 'Requires valid Medical License Number (ML-XXXXXX). Assignment to a registered clinic.',
    icon: Stethoscope,
  },
  {
    id: UserRole.NURSE,
    label: 'Nurse',
    description: 'Triage, monitor vitals, administer medication, support doctors.',
    requirement: 'Requires valid Nursing Certification Number (NC-XXXXXX). Assignment to a registered clinic.',
    icon: Users,
  },
  {
    id: UserRole.PATIENT,
    label: 'Patient',
    description: 'Access your health records, appointments, and educational content.',
    requirement: 'Open registration. No special credentials needed.',
    icon: User,
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [step, setStep] = useState<Step>('role');
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [clinicName, setClinicName] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [provincialDistrict, setProvincialDistrict] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [primaryContact, setPrimaryContact] = useState('');

  const [clinicSearchQuery, setClinicSearchQuery] = useState('');
  const [clinicResults, setClinicResults] = useState<ClinicResult[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<ClinicResult | null>(null);
  const [searchingClinic, setSearchingClinic] = useState(false);
  const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [nationalIdNumber, setNationalIdNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  const isPractitioner = role === UserRole.DOCTOR || role === UserRole.NURSE;
  const isClinicOwner = role === UserRole.CLINIC_OWNER;
  const isPatient = role === UserRole.PATIENT;

  function resetForm() {
    setStep('role');
    setRole(null);
    setErrorMessage(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhoneNumber('');
    setClinicName('');
    setPhysicalAddress('');
    setProvincialDistrict('');
    setRegistrationNumber('');
    setPrimaryContact('');
    setClinicSearchQuery('');
    setClinicResults([]);
    setSelectedClinic(null);
    setMedicalLicenseNumber('');
    setDateOfBirth('');
    setGender('');
    setNationalIdNumber('');
    setEmergencyContact('');
  }

  function selectRole(r: UserRole) {
    setRole(r);
    setStep('details');
    setErrorMessage(null);
  }

  async function searchClinics(query: string) {
    setClinicSearchQuery(query);
    if (query.length < 2) {
      setClinicResults([]);
      return;
    }
    setSearchingClinic(true);
    try {
      const res = await fetch(`/api/clinics?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setClinicResults(data.clinics || []);
    } catch {
      setClinicResults([]);
    } finally {
      setSearchingClinic(false);
    }
  }

  function validateDetails(): string | null {
    if (!fullName.trim()) return 'Full name is required.';

    if (isClinicOwner) {
      if (!clinicName.trim()) return 'Clinic name is required.';
      if (!physicalAddress.trim()) return 'Physical address is required.';
      if (!provincialDistrict) return 'Provincial district is required.';
      if (!registrationNumber.trim()) return 'Clinic registration number is required.';
    }

    if (isPractitioner) {
      if (!selectedClinic) return 'Please select a clinic from the list.';
      if (!medicalLicenseNumber.trim()) return 'Medical license number is required.';
      if (!/^[A-Z]{2}-\d{6}$/.test(medicalLicenseNumber)) {
        return 'License number must be format XX-123456 (e.g. ML-123456).';
      }
    }

    if (isPatient) {
      if (!dateOfBirth) return 'Date of birth is required.';
      if (nationalIdNumber && !/^\d{6}-\d{2}-\d{4}[A-Z]$/.test(nationalIdNumber)) {
        return 'National ID must be format 123456-12-1234X.';
      }
    }

    return null;
  }

  function goToAccount() {
    const error = validateDetails();
    if (error) {
      setErrorMessage(error);
      return;
    }
    setErrorMessage(null);
    setStep('account');
  }

  function validateAccount(): string | null {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/[a-zA-Z]/.test(password)) return 'Password must contain at least one letter.';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  }

  async function handleSubmit() {
    const error = validateAccount();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const payload: Record<string, unknown> = {
        email,
        password,
        fullName,
        phoneNumber: phoneNumber || undefined,
        role,
      };

      if (isClinicOwner) {
        payload.clinicName = clinicName;
        payload.physicalAddress = physicalAddress;
        payload.provincialDistrict = provincialDistrict;
        payload.registrationNumber = registrationNumber;
        payload.primaryContact = primaryContact || undefined;
      }

      if (isPractitioner) {
        payload.medicalLicenseNumber = medicalLicenseNumber;
        payload.clinicId = selectedClinic!.id;
      }

      if (isPatient) {
        payload.dateOfBirth = dateOfBirth;
        payload.gender = gender || undefined;
        payload.nationalIdNumber = nationalIdNumber || undefined;
        payload.emergencyContact = emergencyContact || undefined;
      }

      await register(payload);
      setStep('success');
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-surface-dark">
      {/* Brand sidebar */}
      <div className="hidden lg:flex lg:w-[440px] relative flex-col bg-gradient-to-br from-medical-600 via-medical-700 to-medical-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-medical-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-healthcare-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col h-full p-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">HutanoTrack</h1>
              <p className="text-medical-200 text-xs">Digital Healthcare for Zimbabwe</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm">
            <h2 className="text-3xl font-bold text-white leading-tight mb-3">
              Get Started
              <br />
              <span className="text-medical-200">Create Your Account</span>
            </h2>
            <p className="text-medical-200/80 text-sm leading-relaxed mb-8">
              Select your role and follow the steps. Healthcare professionals must verify their
              credentials during registration.
            </p>

            {/* Steps indicator */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                  step === 'role' ? 'bg-white text-medical-700' : 'bg-white/20 text-white',
                )}>1</div>
                <div>
                  <p className={cn('text-sm font-medium', step === 'role' ? 'text-white' : 'text-medical-200/60')}>Select Role</p>
                  <p className="text-xs text-medical-200/40">Choose your account type</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                  step === 'details' ? 'bg-white text-medical-700' : step === 'account' || step === 'success' ? 'bg-white/30 text-white' : 'bg-white/10 text-medical-200/40',
                )}>2</div>
                <div>
                  <p className={cn('text-sm font-medium', step === 'details' || step === 'account' || step === 'success' ? 'text-white' : 'text-medical-200/40')}>Provide Details</p>
                  <p className="text-xs text-medical-200/40">Role-specific information</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                  step === 'account' ? 'bg-white text-medical-700' : step === 'success' ? 'bg-white/30 text-white' : 'bg-white/10 text-medical-200/40',
                )}>3</div>
                <div>
                  <p className={cn('text-sm font-medium', step === 'account' || step === 'success' ? 'text-white' : 'text-medical-200/40')}>Create Credentials</p>
                  <p className="text-xs text-medical-200/40">Set up email and password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 flex items-start justify-center p-4 sm:p-8 min-w-0 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-medical-500 flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">HutanoTrack</h1>
              <p className="text-xs text-gray-400">Create Account</p>
            </div>
          </div>

          {/* Error banner */}
          {errorMessage && (
            <div className="mb-4 flex items-start gap-3 p-4 rounded-2xl border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-300">{errorMessage}</p>
            </div>
          )}

          {/* Step: Role Selection */}
          {step === 'role' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span className="w-6 h-6 rounded-full bg-medical-100 dark:bg-medical-800 text-medical-600 dark:text-medical-300 flex items-center justify-center text-xs font-bold">1</span>
                  Step 1 of 3
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">What describes you best?</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Select your role to get started.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {ROLE_CARDS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => selectRole(r.id)}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-surface-dark-elevated border border-gray-200 dark:border-gray-700 hover:border-medical-300 dark:hover:border-medical-600 hover:shadow-sm transition-all text-left w-full group"
                    >
                      <div className="p-3 rounded-xl bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-300 group-hover:bg-medical-100 dark:group-hover:bg-medical-900/50 transition-colors shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 dark:text-gray-100">{r.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{r.description}</p>
                        <p className="text-xs text-amber-500 dark:text-amber-400 mt-1">{r.requirement}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-medical-500 transition-colors shrink-0 mt-1" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step: Details */}
          {step === 'details' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <span className="w-6 h-6 rounded-full bg-medical-100 dark:bg-medical-800 text-medical-600 dark:text-medical-300 flex items-center justify-center text-xs font-bold">2</span>
                    Step 2 of 3
                  </div>
                  <button
                    type="button"
                    onClick={() => { setStep('role'); setErrorMessage(null); }}
                    className="text-xs text-medical-600 hover:text-medical-700 dark:text-medical-400 font-medium"
                  >
                    Change role
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {isClinicOwner && 'Register Your Clinic'}
                  {isPractitioner && 'Professional Details'}
                  {isPatient && 'Personal Information'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {isClinicOwner && 'Provide your clinic registration details.'}
                  {isPractitioner && 'Select your clinic and enter your license number.'}
                  {isPatient && 'Tell us about yourself.'}
                </p>
              </div>

              <div className="space-y-4">
                {/* Common: full name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tendai Mukanya"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                  />
                </div>

                {/* Common: phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+263 77 123 4567"
                      className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                    />
                  </div>
                </div>

                {/* CLINIC_OWNER fields */}
                {isClinicOwner && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Clinic Name <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={clinicName}
                          onChange={(e) => setClinicName(e.target.value)}
                          placeholder="e.g. Mbare Community Clinic"
                          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Physical Address <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-3 text-gray-400 pointer-events-none">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <textarea
                          value={physicalAddress}
                          onChange={(e) => setPhysicalAddress(e.target.value)}
                          placeholder="e.g. 123 Samora Machel Avenue, Harare"
                          rows={2}
                          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all resize-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Provincial District <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={provincialDistrict}
                        onChange={(e) => setProvincialDistrict(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      >
                        <option value="">Select a district...</option>
                        {ZIMBABWE_DISTRICTS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Ministry of Health Registration Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <FileText className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={registrationNumber}
                          onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                          placeholder="e.g. MOH-CL-2024-001"
                          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Use uppercase letters, numbers, and hyphens only.</p>
                    </div>
                  </>
                )}

                {/* DOCTOR / NURSE fields */}
                {isPractitioner && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Search for a Clinic <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Search className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={clinicSearchQuery}
                          onChange={(e) => searchClinics(e.target.value)}
                          placeholder="Search by clinic name, district, or reg number..."
                          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                        />
                        {searchingClinic && (
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                          </div>
                        )}
                      </div>

                      {clinicResults.length > 0 && !selectedClinic && (
                        <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-xl divide-y divide-gray-100 dark:divide-gray-800 max-h-48 overflow-y-auto">
                          {clinicResults.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => { setSelectedClinic(c); setClinicSearchQuery(c.clinicName); setClinicResults([]); }}
                              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{c.clinicName}</p>
                              <p className="text-xs text-gray-400">{c.physicalAddress} &middot; {c.provincialDistrict}</p>
                            </button>
                          ))}
                        </div>
                      )}

                      {selectedClinic && (
                        <div className="mt-2 flex items-center gap-3 p-3 rounded-xl bg-medical-50 dark:bg-medical-900/20 border border-medical-200 dark:border-medical-800">
                          <Check className="w-4 h-4 text-medical-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-medical-700 dark:text-medical-300">{selectedClinic.clinicName}</p>
                            <p className="text-xs text-medical-500">{selectedClinic.physicalAddress}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setSelectedClinic(null); setClinicSearchQuery(''); }}
                            className="text-xs text-gray-400 hover:text-gray-600 shrink-0"
                          >
                            Change
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {role === UserRole.DOCTOR ? 'Medical License Number' : 'Nursing Certification Number'} <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <BadgeCheck className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={medicalLicenseNumber}
                          onChange={(e) => setMedicalLicenseNumber(e.target.value.toUpperCase())}
                          placeholder={role === UserRole.DOCTOR ? 'ML-123456' : 'NC-123456'}
                          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Format: {role === UserRole.DOCTOR ? 'ML' : 'NC'}- followed by 6 digits.
                        Your account will be <span className="font-medium text-amber-500">pending approval</span> until verified.
                      </p>
                    </div>
                  </>
                )}

                {/* PATIENT fields */}
                {isPatient && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Date of Birth <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      >
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        National ID Number
                      </label>
                      <input
                        type="text"
                        value={nationalIdNumber}
                        onChange={(e) => setNationalIdNumber(e.target.value.toUpperCase())}
                        placeholder="e.g. 123456-12-1234X"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      />
                      <p className="text-xs text-gray-400 mt-1">Optional. Format: 123456-12-1234X</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        placeholder="Name and phone number"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setStep('role'); setErrorMessage(null); }}
                    className="min-h-[44px]"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={goToAccount}
                    className="flex-1 min-h-[44px]"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step: Account */}
          {step === 'account' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span className="w-6 h-6 rounded-full bg-medical-100 dark:bg-medical-800 text-medical-600 dark:text-medical-300 flex items-center justify-center text-xs font-bold">3</span>
                  Step 3 of 3
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create your credentials</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Set up your email and password to complete registration.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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
                      disabled={isLoading}
                      autoComplete="email"
                      className="w-full px-4 py-3 pl-10 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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
                      disabled={isLoading}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pl-10 pr-11 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      placeholder="Min 6 chars, letter + number"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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
                      disabled={isLoading}
                      autoComplete="new-password"
                      className="w-full px-4 py-3 pl-10 pr-11 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark-elevated text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all"
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Summary</p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Role: <span className="font-medium text-gray-700 dark:text-gray-300">{role}</span></p>
                    <p>Name: <span className="font-medium text-gray-700 dark:text-gray-300">{fullName}</span></p>
                    {isClinicOwner && <p>Clinic: <span className="font-medium text-gray-700 dark:text-gray-300">{clinicName}</span></p>}
                    {isPractitioner && selectedClinic && (
                      <p>Clinic: <span className="font-medium text-gray-700 dark:text-gray-300">{selectedClinic.clinicName}</span></p>
                    )}
                    {isPractitioner && (
                      <p>
                        {role === UserRole.DOCTOR ? 'License' : 'Certification'}:{' '}
                        <span className="font-medium text-gray-700 dark:text-gray-300">{medicalLicenseNumber}</span>
                      </p>
                    )}
                    {isPatient && dateOfBirth && (
                      <p>DOB: <span className="font-medium text-gray-700 dark:text-gray-300">{dateOfBirth}</span></p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setStep('details'); setErrorMessage(null); }}
                    disabled={isLoading}
                    className="min-h-[44px]"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    loading={isLoading}
                    disabled={isLoading}
                    className="flex-1 min-h-[44px]"
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                    {!isLoading && <ArrowRight className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account created!</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Welcome to HutanoTrack. Redirecting to your dashboard...
              </p>
            </motion.div>
          )}

          {/* Footer link */}
          {step !== 'success' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => router.push('/auth/login')}
                  className="font-semibold text-medical-600 hover:text-medical-700 dark:text-medical-400 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
