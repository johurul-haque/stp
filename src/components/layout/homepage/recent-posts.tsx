import { SearchInput } from '@/components/shared/search-input';
import { TripsCards } from '@/components/shared/trips-card';
import { Suspense } from 'react';

export function RecentPosts({ query = '' }) {
  return (
    <section className="@container">
      <h2 className="text-xl text-center font-medium underline underline-offset-4 decoration-wavy decoration-green-700 mb-6">
        Recent Posts
      </h2>

      <div className="flex justify-center">
        <SearchInput />
      </div>

      <Suspense key={query}>
        <TripsCards query={query} isPrivate={false} />
      </Suspense>
    </section>
  );
}
