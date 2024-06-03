'use client';

import { Logo } from '@/components/header/logo';
import { buttonVariants } from '@/components/ui/button';
import { atma } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const redirectFrom = searchParams.get('redirect_from');

  return (
    <main className="container relative h-[100svh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={generateHref(pathname, redirectFrom)}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        {pathname === '/register' ? 'Login' : 'Register'}
      </Link>

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
        <div className="mx-auto flex w-full flex-col gap-2.5 justify-center sm:w-[350px]">
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

function generateHref(pathname: string, redirect_from: string | null) {
  let href;

  if (pathname === '/register') {
    href = '/login';
  } else {
    href = '/register';
  }

  return redirect_from ? `${href}?redirect_from=${redirect_from}` : href;
}
