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
  const { sidebarOpen } = useDashboard();

  return (
    <div className="h-screen bg-slate-100 dark:bg-surface-dark overflow-hidden">
      <Sidebar />
      <div
        className={cn(
          'flex flex-col h-full transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-[72px]',
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export { useDashboard };
