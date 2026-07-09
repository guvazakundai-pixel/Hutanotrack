import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HutanoTrack - Family Portal',
  description: 'Stay connected with your loved one\'s healthcare journey',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 font-sans">{children}</body>
    </html>
  );
}
