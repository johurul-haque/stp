'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <main className="container min-h-svh flex flex-col justify-center items-center">
        <h2
          className={cn(
            'text-lg lg:text-xl font-medium mb-1 text-center',
            inter.className
          )}
        >
          Something went wrong on our side!
        </h2>
        <p className="mb-3 max-sm:text-sm max-w-xs text-center">
          Apologies for the inconvenience. Hire{' '}
          <a
            href="https://github.com/johurul-haque"
            className="underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Johurul(😎)
          </a>{' '}
          to fix this.
        </p>

        <div className="flex items-center gap-3 my-2">
          <Button onClick={() => reset()}>try again</Button>
          <Link
            href={'/login'}
            className={buttonVariants({ variant: 'outline' })}
          >
            Or sign in again
          </Link>
        </div>
      </main>
    </div>
  );
}
