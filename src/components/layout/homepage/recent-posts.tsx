import { SearchInput } from '@/components/shared/search-input';
import { TripsCards } from '@/components/shared/trips-card';
import { TripsCardSkeleton } from '@/components/shared/trips-card/skeleton';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export function RecentPosts({ query = '' }) {
  return (
    <section className="@container pb-16">
      <h2 className="text-xl text-center font-medium underline underline-offset-4 decoration-wavy decoration-green-700 mb-6">
        Recent Posts
      </h2>

      <div className="flex justify-center mb-8">
        <SearchInput />
      </div>

      <Suspense key={query} fallback={<TripsCardSkeleton />}>
        <TripsCards query={query} />
      </Suspense>

      <Link
        href={'/trips'}
        className="flex justify-center gap-x-1.5 mt-8 group max-w-fit mx-auto"
      >
        View more
        <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </section>
  );
}
