import { TripsCardSkeleton } from '@/components/shared/trips-card/skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loader() {
  return (
    <main className="container py-10">
      <h1 className="text-xl text-center font-medium underline underline-offset-8 decoration-wavy decoration-green-700 mb-8">
        All Trips
      </h1>

      <div className="flex justify-center mb-10">
        <Skeleton className="h-10 max-w-sm w-full" />
      </div>

      <TripsCardSkeleton />
    </main>
  );
}
