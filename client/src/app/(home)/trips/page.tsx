import { SearchInput } from '@/components/shared/search-input';
import { TripsCardSkeleton } from '@/components/shared/trips-card/skeleton';
import { TripsCardWithPagination } from '@/components/shared/trips-card/with-pagination';
import { Suspense } from 'react';

type PageProps = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function TripsPage({ searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const page = searchParams?.page || '';

  return (
    <main className="container py-10">
      <h1 className="text-xl text-center font-medium underline underline-offset-8 decoration-wavy decoration-green-700 mb-8">
        All Trips
      </h1>

      <div className="flex justify-center mb-10">
        <SearchInput />
      </div>

      <Suspense key={query + page} fallback={<TripsCardSkeleton />}>
        <TripsCardWithPagination page={page} query={query} />
      </Suspense>
    </main>
  );
}
