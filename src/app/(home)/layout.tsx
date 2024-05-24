import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Toaster />
    </>
  );
}
