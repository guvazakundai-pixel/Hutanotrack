import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from '@/providers/auth-provider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'HutanoTrack - Keeping Communities Connected to Care',
  description: 'A modern digital healthcare platform designed for Zimbabwe and low-resource environments.',
  keywords: ['healthcare', 'Zimbabwe', 'patient management', 'clinic', 'medical records'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-surface-dark antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
