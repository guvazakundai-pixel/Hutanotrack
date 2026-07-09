'use client';

import { ReactNode } from 'react';
import { DashboardProvider, useDashboard } from '@/providers/dashboard-context';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <DashboardInner>{children}</DashboardInner>
    </DashboardProvider>
  );
}

function DashboardInner({ children }: { children: ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]',
        )}
      >
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export { useDashboard };
