import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { ReactNode } from 'react';
import { SidebarNav } from './_components/sidebar';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="py-10 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 container">
        <aside className="lg:w-1/5">
          <SidebarNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
      <Toaster />
    </>
  );
}
