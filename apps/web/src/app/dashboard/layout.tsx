'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, LayoutDashboard, Users, Calendar, Pill, FlaskConical,
  Map, BarChart3, Settings, Bell, Search, ChevronLeft,
  Menu, X, LogOut, User,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/patients', label: 'Patients', icon: Users },
  { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
  { href: '/dashboard/pharmacy', label: 'Pharmacy', icon: Pill },
  { href: '/dashboard/laboratory', label: 'Laboratory', icon: FlaskConical },
  { href: '/dashboard/community', label: 'Community', icon: Map },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } flex flex-col bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-neutral-100">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-medical-600 flex items-center justify-center flex-shrink-0">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-lg font-bold text-neutral-900 whitespace-nowrap overflow-hidden"
                >
                  HutanoTrack
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-medical-500 focus:outline-none focus:ring-2 focus:ring-medical-500/20 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-medical-50 text-medical-700'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-medical-600' : ''}`} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-neutral-100 p-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
            <div className="h-9 w-9 rounded-full bg-medical-100 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-medical-600" />
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium text-neutral-900 truncate">Dr. Sarah Moyo</p>
                  <p className="text-xs text-neutral-500 truncate">sarah@hutanotrack.co.zw</p>
                </motion.div>
              )}
            </AnimatePresence>
            <LogOut className="h-4 w-4 text-neutral-400 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              {sidebarLinks.find((l) => pathname === l.href)?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-neutral-100 transition-colors">
              <Bell className="h-5 w-5 text-neutral-600" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="h-8 w-px bg-neutral-200" />
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <span className="text-sm font-medium text-neutral-700">Dr. Sarah Moyo</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
