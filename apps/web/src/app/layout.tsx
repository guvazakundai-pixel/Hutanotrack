import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HutanoTrack - Clinic Dashboard',
  description: 'Keeping Communities Connected to Care',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-50 font-sans">{children}</body>
    </html>
  );
}
