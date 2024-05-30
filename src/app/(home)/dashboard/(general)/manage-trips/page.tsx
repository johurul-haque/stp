import { TripsCards } from '@/components/shared/trips-card';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { getAllTrips } from '@/lib/api/get-all-trips';
import { BadgePlusIcon } from 'lucide-react';
import Link from 'next/link';

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

      <div className="flex max-sm:flex-col justify-between items-center mt-6 gap-x-6 gap-y-4">
        <Input type="search" placeholder="Search trips" className="max-w-xs" />
        <Link
          href={'/dashboard/trips/create'}
          className={buttonVariants({
            size: 'sm',
            className: 'flex gap-x-1.5',
          })}
        >
          <BadgePlusIcon className="size-5" />
          Create trip plan
        </Link>
      </div>

      <TripsCards data={trips.data} />
    </main>
  );
}
