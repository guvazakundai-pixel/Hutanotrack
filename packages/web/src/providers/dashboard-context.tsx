'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  sidebarOpen: true,
  setSidebarOpen: () => {},
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <DashboardContext.Provider value={{ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
