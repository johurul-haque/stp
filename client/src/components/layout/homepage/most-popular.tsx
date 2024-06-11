import { PopularTrips } from '@/components/shared/trips-card/popular';
import { TripsCardSkeleton } from '@/components/shared/trips-card/skeleton';
import { Suspense } from 'react';

export function MostPopular() {
  return (
    <section className="@container pt-16 pb-32">
      <h2 className="text-xl text-center font-medium underline underline-offset-8 decoration-wavy decoration-green-700 mb-12">
        Most Popular
      </h2>

      <Suspense fallback={<TripsCardSkeleton length={6} />}>
        <PopularTrips />
      </Suspense>
    </section>
  );
}
