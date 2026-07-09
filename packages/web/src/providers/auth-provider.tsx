'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
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

// Mock user for development
const MOCK_USER: User = {
  id: '1',
  phone: '+263712345678',
  email: 'admin@hutanotrack.co.zw',
  firstName: 'Tariro',
  lastName: 'Moyo',
  role: UserRole.ADMIN,
  language: 'en',
  isActive: true,
  createdAt: new Date().toISOString(),
};

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

  const login = useCallback(async (phone: string, password: string) => {
    // Mock login - replace with actual API call
    setUser(MOCK_USER);
    localStorage.setItem('hutanotrack-token', 'mock-token');
    localStorage.setItem('hutanotrack-user', JSON.stringify(MOCK_USER));
  }, []);

  const loginWithOtp = useCallback(async (phone: string, otp: string) => {
    setUser(MOCK_USER);
    localStorage.setItem('hutanotrack-token', 'mock-token');
    localStorage.setItem('hutanotrack-user', JSON.stringify(MOCK_USER));
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
