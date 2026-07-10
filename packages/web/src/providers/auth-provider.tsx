'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  loginWithOtp: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  loginWithOtp: async () => {},
  logout: () => {},
  hasRole: () => false,
});

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('hutanotrack-token');
    const storedUser = localStorage.getItem('hutanotrack-user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string, role: UserRole = UserRole.ADMIN) => {
    const { firstName, lastName } = deriveName(email, role);
    const newUser: User = {
      id: '1',
      phone: email,
      email,
      firstName,
      lastName,
      role,
      language: 'en',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('hutanotrack-token', 'mock-token');
    localStorage.setItem('hutanotrack-user', JSON.stringify(newUser));
  }, []);

  const loginWithOtp = useCallback(async (phone: string, _otp: string) => {
    const newUser: User = {
      id: '1',
      phone,
      email: `${phone}@hutanotrack.co.zw`,
      firstName: 'Phone',
      lastName: 'User',
      role: UserRole.PATIENT,
      language: 'en',
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('hutanotrack-token', 'mock-token');
    localStorage.setItem('hutanotrack-user', JSON.stringify(newUser));
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
    <AuthContext.Provider value={{ user, loading, login, loginWithOtp, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
