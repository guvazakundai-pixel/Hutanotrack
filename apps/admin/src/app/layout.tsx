import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HutanoTrack - Administration',
  description: 'System administration portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-900">{children}</body>
    </html>
  );
}
