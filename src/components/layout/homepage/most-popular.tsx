import { TripsCards } from '@/components/shared/trips-card';
import { TripsCardSkeleton } from '@/components/shared/trips-card/skeleton';
import { Suspense } from 'react';

export function MostPopular() {
  return (
    <section className="@container py-16">
      <h2 className="text-xl text-center font-medium underline underline-offset-4 decoration-wavy decoration-green-700 mb-12">
        Most Popular
      </h2>

      <Suspense fallback={<TripsCardSkeleton length={6} />}>
        <TripsCards />
      </Suspense>
    </section>
  );
}
