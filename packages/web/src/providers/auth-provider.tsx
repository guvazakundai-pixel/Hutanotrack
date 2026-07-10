'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface StoredAccount {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (email: string, password: string, role: UserRole) => Promise<void>;
  loginWithOtp: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  loginWithOtp: async () => {},
  logout: () => {},
  hasRole: () => false,
});

const ACCOUNTS_KEY = 'hutanotrack-accounts';

const DEFAULT_ACCOUNTS: Record<string, StoredAccount> = {
  'admin@example.com': {
    email: 'admin@example.com',
    password: 'Admin@123',
    role: UserRole.ADMIN,
    firstName: 'System',
    lastName: 'Admin',
  },
  'doctor@example.com': {
    email: 'doctor@example.com',
    password: 'Doctor@123',
    role: UserRole.DOCTOR,
    firstName: 'Sarah',
    lastName: 'Doctor',
  },
  'nurse@example.com': {
    email: 'nurse@example.com',
    password: 'Nurse@123',
    role: UserRole.NURSE,
    firstName: 'Grace',
    lastName: 'Nurse',
  },
  'chw@example.com': {
    email: 'chw@example.com',
    password: 'Chw@123',
    role: UserRole.CHW,
    firstName: 'Tendai',
    lastName: 'CHW',
  },
  'patient@example.com': {
    email: 'patient@example.com',
    password: 'Patient@123',
    role: UserRole.PATIENT,
    firstName: 'Chipo',
    lastName: 'Patient',
  },
};

function getAccounts(): Record<string, StoredAccount> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
  return { ...DEFAULT_ACCOUNTS };
}

function saveAccounts(accounts: Record<string, StoredAccount>) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function deriveName(email: string, role: UserRole): { firstName: string; lastName: string } {
  const prefix = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
  const name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
  if (role === UserRole.ADMIN) return { firstName: name, lastName: 'Admin' };
  if (role === UserRole.DOCTOR) return { firstName: name, lastName: 'Doctor' };
  if (role === UserRole.NURSE) return { firstName: name, lastName: 'Nurse' };
  if (role === UserRole.CHW) return { firstName: name, lastName: 'CHW' };
  if (role === UserRole.PATIENT) return { firstName: name, lastName: 'Patient' };
  if (role === UserRole.FAMILY) return { firstName: name, lastName: 'Family' };
  return { firstName: name, lastName: 'Staff' };
}

function validatePasswordStrength(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/[a-zA-Z]/.test(password)) return 'Password must contain at least one letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
}

function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return 'Enter a valid email address';
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hutanotrack-token');
    const storedUser = localStorage.getItem('hutanotrack-user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('hutanotrack-token');
        localStorage.removeItem('hutanotrack-user');
      }
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (email: string, password: string, role: UserRole) => {
    const emailError = validateEmail(email);
    if (emailError) throw new Error(emailError);

    const passwordError = validatePasswordStrength(password);
    if (passwordError) throw new Error(passwordError);

    const accounts = getAccounts();
    const key = email.toLowerCase().trim();

    if (accounts[key]) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const { firstName, lastName } = deriveName(email, role);
    accounts[key] = { email: key, password, role, firstName, lastName };
    saveAccounts(accounts);
  }, []);

  const login = useCallback(async (email: string, password: string, role?: UserRole) => {
    if (!email.trim() || !password) {
      throw new Error('Email and password are required.');
    }

    const accounts = getAccounts();
    const key = email.toLowerCase().trim();
    const account = accounts[key];

    if (!account) {
      throw new Error(
        `No account found for "${email}". Please create an account first, or use one of the demo accounts (e.g. admin@example.com / Admin@123).`,
      );
    }

    if (account.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    if (role && account.role !== role) {
      throw new Error(
        `This account is registered as "${account.role}". Please select the correct role and try again.`,
      );
    }

    const newUser: User = {
      id: email,
      phone: email,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      role: account.role,
      language: 'en',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('hutanotrack-token', 'mock-token');
    localStorage.setItem('hutanotrack-user', JSON.stringify(newUser));
  }, []);

  const loginWithOtp = useCallback(async (_phone: string, _otp: string) => {
    throw new Error('OTP login is not available yet.');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('hutanotrack-token');
    localStorage.removeItem('hutanotrack-user');
  }, []);

  const hasRole = useCallback(
    (roles: UserRole[]) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user],
  );

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithOtp, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
