'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useTheme } from '@/providers/theme-provider';
import { useDashboard } from '@/providers/dashboard-context';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Pill,
  FlaskConical,
  HeartPulse,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Building2,
  UserCircle,
} from 'lucide-react';
import { UserRole } from '@/types';

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.DATA_MANAGER, UserRole.PHARMACIST, UserRole.LAB_STAFF] },
  { label: 'Patients', icon: <Users className="w-5 h-5" />, href: '/patients', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST, UserRole.DATA_MANAGER] },
  { label: 'Appointments', icon: <CalendarCheck className="w-5 h-5" />, href: '/appointments', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST] },
  { label: 'Pharmacy', icon: <Pill className="w-5 h-5" />, href: '/pharmacy', roles: [UserRole.ADMIN, UserRole.PHARMACIST] },
  { label: 'Laboratory', icon: <FlaskConical className="w-5 h-5" />, href: '/laboratory', roles: [UserRole.ADMIN, UserRole.LAB_STAFF] },
  { label: 'Community', icon: <Building2 className="w-5 h-5" />, href: '/community', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.CHW, UserRole.DATA_MANAGER] },
  { label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, href: '/analytics', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.DATA_MANAGER] },
  { label: 'Emergency', icon: <HeartPulse className="w-5 h-5" />, href: '/emergency', roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.CHW] },
  { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings', roles: [UserRole.ADMIN] },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { sidebarOpen: collapsed, setSidebarOpen: setCollapsed } = useDashboard();

  const filteredItems = navItems.filter((item) => hasRole(item.roles));

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      className={cn(
        'fixed left-0 top-0 h-screen z-40',
        'bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-gray-800',
        'flex flex-col',
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-800', collapsed && 'justify-center')}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-medical-500 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">HutanoTrack</h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">Clinic Dashboard</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide">
        {filteredItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  isActive && 'bg-medical-50 dark:bg-medical-900/20 text-medical-600 dark:text-medical-400 font-medium',
                  collapsed && 'justify-center px-2',
                )}
              >
                <span className={cn(isActive ? 'text-medical-500' : 'text-gray-400 dark:text-gray-500')}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="text-sm">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-medical-500"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User & Controls */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-3 space-y-2">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-medical-500 flex items-center justify-center text-white text-sm font-medium">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
        )}

        <div className={cn('flex gap-1', collapsed && 'flex-col')}>
          <button
            onClick={toggleTheme}
            className={cn(
              'flex-1 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors',
              collapsed && 'flex justify-center',
            )}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'flex-1 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors',
              collapsed && 'flex justify-center',
            )}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={logout}
            className={cn(
              'flex-1 p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors',
              collapsed && 'flex justify-center',
            )}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
