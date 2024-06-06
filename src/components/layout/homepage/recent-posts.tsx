import { SearchInput } from '@/components/shared/search-input';
import { TripsCards } from '@/components/shared/trips-card';
import { TripsCardSkeleton } from '@/components/shared/trips-card/skeleton';
import { buttonVariants } from '@/components/ui/button';
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

      <div className="flex justify-center mt-10">
        <Link
          href={'/trips'}
          className={buttonVariants({
            className: 'flex justify-center gap-x-1.5 group max-w-fit mx-auto',
            variant: 'outline',
          })}
        >
          View more
          <ChevronRightIcon className="group-hover:translate-x-1 transition-transform dark:text-neutral-600 text-neutral-400" />
        </Link>
      </div>
    </section>
  );
}
