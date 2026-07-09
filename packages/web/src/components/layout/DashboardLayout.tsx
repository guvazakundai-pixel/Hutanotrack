'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardProvider, useDashboard } from '@/providers/dashboard-context';
import { useAuth } from '@/providers/auth-provider';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <DashboardGuard>{children}</DashboardGuard>
    </DashboardProvider>
  );
}

function DashboardGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100 dark:bg-surface-dark">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return <DashboardInner>{children}</DashboardInner>;
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
