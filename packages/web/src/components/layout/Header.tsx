'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Bell, Search, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/providers/auth-provider';
import { useDashboard } from '@/providers/dashboard-context';

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { setMobileMenuOpen } = useDashboard();
  const [searchOpen, setSearchOpen] = useState(false);

  const pageTitle = pathname
    ? pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Dashboard'
    : 'Dashboard';

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize leading-tight">
              {pageTitle}
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-surface-dark" />
          </button>

          {user && (
            <div className="flex items-center gap-3 pl-3 ml-1 border-l border-gray-200 dark:border-gray-700">
              <Avatar firstName={user.firstName} lastName={user.lastName} size="sm" />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user.role.replace(/_/g, ' ')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}