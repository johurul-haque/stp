'use client';

import { buttonVariants } from '@/components/ui/button';
import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <main className="container min-h-svh flex flex-col justify-center items-center">
        <h2 className={cn('text-lg lg:text-xl font-medium', inter.className)}>
          Something went wrong!
        </h2>
        <p className="mb-3 max-sm:text-sm">
          Hire{' '}
          <a
            href="https://github.com/johurul-haque"
            className="underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            johurul(😎)
          </a>{' '}
          to fix this.
        </p>
        <button
          className={buttonVariants({ variant: 'outline' })}
          onClick={() => reset()}
        >
          try again
        </button>
      </main>
    </div>
  );
}
