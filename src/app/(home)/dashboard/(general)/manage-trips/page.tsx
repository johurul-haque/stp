import { TripsCards } from '@/components/shared/trips-card';
import { Separator } from '@/components/ui/separator';
import { getAllTrips } from '@/lib/api/get-all-trips';

export default async function ManageTripsPage() {
  const trips = await getAllTrips();

  return (
    <main>
      <div className="my-6">
        <h1 className="text-lg font-medium mb-0.5">Manage trips</h1>
        <p className="text-sm">
          {'A list of the trips. Manage them by editing, or deleting any trip.'}
        </p>
      </div>

      <Separator />

      <TripsCards data={trips.data} />
    </main>
  );
}
