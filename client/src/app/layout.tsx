import { inter } from '@/lib/fonts';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Social Travel Platform | Find travel companions',
  description: 'Find travel companions by sharing and exploring trip plans.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
