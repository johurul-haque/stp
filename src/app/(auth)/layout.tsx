'use client';

import { Logo } from '@/components/header/logo';
import { atma } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ReactNode, Suspense } from 'react';
import { LinkWithRedirectUrl } from './_components/link-with-redirect';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="container relative h-[100svh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Suspense>
        <LinkWithRedirectUrl />
      </Suspense>

      <div className="relative h-full hidden flex-col p-10 text-white lg:flex dark:border-r-2 dark:border-neutral-800/50">
        <div className="absolute inset-0 bg-neutral-950" />

        <div className="absolute inset-10 flex flex-col justify-center items-center">
          <Logo
            className={{
              wrapper: 'text-7xl',
              logo: 'size-16 mr-3',
            }}
          />
          <p
            className={cn('text-center mt-1.5 tracking-widest', atma.className)}
          >
            Find travel companions 🫂
          </p>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col gap-2.5 justify-center min-[400px]:w-[350px]">
          <div className="flex flex-col mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back!
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to login
            </p>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
