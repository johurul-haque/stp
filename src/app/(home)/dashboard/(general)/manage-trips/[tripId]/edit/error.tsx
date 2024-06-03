'use client';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function ErrorPage({ error }: { error: Error }) {
  const notFoundError = error.message.includes('404');

  if (!notFoundError) throw new Error(error.message, { cause: error.cause });

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 my-16">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested trip.</p>
      <Link
        href="/dashboard/manage-trips"
        className={buttonVariants({ size: 'sm', className: 'mt-2' })}
      >
        Go Back
      </Link>
    </main>
  );
}
