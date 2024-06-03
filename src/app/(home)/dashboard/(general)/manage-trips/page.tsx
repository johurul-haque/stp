import { SearchInput } from '@/components/shared/search-input';
import { TripsCards } from '@/components/shared/trips-card';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BadgePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

type PageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function ManageTripsPage({ searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const currentPage = searchParams?.page || '1';

  return (
    <main>
      <div className="my-6">
        <h1 className="text-lg font-medium mb-0.5">Manage trips</h1>
        <p className="text-sm">
          {'A list of the trips. Manage them by editing, or deleting any trip.'}
        </p>
      </div>

      <Separator />

      <div className="flex max-sm:flex-col justify-between items-center mt-6 gap-x-6 gap-y-4">
        <SearchInput />

        <Link
          href={'/dashboard/trips/create'}
          className={buttonVariants({
            size: 'sm',
            className: 'flex gap-x-1.5',
          })}
        >
          <BadgePlusIcon className="size-5" />
          Create trip
        </Link>
      </div>

      <Suspense key={query + currentPage}>
        <TripsCards query={query} />
      </Suspense>
    </main>
  );
}
