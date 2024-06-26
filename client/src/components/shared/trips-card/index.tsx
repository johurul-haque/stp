import { getAllTrips } from '@/lib/api/get-all-trips';
import { cn } from '@/lib/utils';
import { Trip } from '@/types/trip';
import { format } from 'date-fns';
import {
  CalendarDaysIcon,
  ChevronRight,
  MapPinIcon,
  PenBoxIcon,
} from 'lucide-react';
import Link from 'next/link';
import { DeleteTripModal } from './delete-trip';
import { PreviewImagesModal } from './preview-images/modal';

type CardProps = {
  isPrivate?: boolean;
  query?: string;
  data?: (Trip & {
    _count?: {
      TravelPairRequest: number;
    };
  })[];
};

export async function TripsCards({ isPrivate, query, data }: CardProps) {
  if (!data) {
    data = (await getAllTrips({ _q: query }, isPrivate)).data;
  }

  return (
    <div className="grid max-xs:grid-cols-1 max-sm:mx-auto max-sm:max-w-72 grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] @5xl:grid-cols-[repeat(auto-fill,minmax(31rem,1fr))] @6xl:grid-cols-[repeat(auto-fill,31rem)] justify-center gap-6 mt-6">
      {data.map((trip) => (
        <article key={trip.id} className="flex flex-col @container">
          <div className="border border-b-0 dark:border-neutral-800 rounded-md rounded-b-none p-3 xs:p-4 grid content-start @md:grid-cols-2 gap-4 items-start flex-1">
            <Link
              href={`/trips/${trip.id}`}
              aria-label="View details of the trip"
            >
              <dl className="grid gap-1.5">
                <dt className="sr-only">Destination</dt>
                <dd className="flex items-start gap-2">
                  <MapPinIcon
                    aria-hidden
                    size={20}
                    className="text-neutral-400 dark:text-neutral-700 flex-shrink-0"
                  />
                  <span className="truncate tracking-wide max-xl:text-sm dark:text-neutral-300">
                    {trip.destination}
                  </span>
                </dd>

                <dt className="sr-only">Start and end date</dt>
                <dd className="flex items-center gap-2">
                  <CalendarDaysIcon
                    size={16}
                    aria-hidden
                    className="text-neutral-400 dark:text-neutral-700 flex-shrink-0"
                  />
                  <span className="text-xs font-light dark:text-neutral-400">
                    {format(trip.startDate, 'LLL dd, y')} -{' '}
                    {format(trip.endDate, 'LLL dd, y')}
                  </span>
                </dd>

                <dt className="sr-only">Description</dt>
                <dd className="mt-2 dark:text-neutral-300">
                  <p className="line-clamp-3 text-sm font-light tracking-wide leading-5">
                    {trip.description}
                  </p>
                </dd>
              </dl>
            </Link>

            <PreviewImagesModal
              images={trip.images}
              destination={trip.destination}
            />
          </div>

          <footer
            className={cn(
              'border border-t-0 dark:border-0 rounded-b-md overflow-clip text-sm divide-x dark:divide-neutral-700 group font-mono dark:text-neutral-300',
              isPrivate && 'grid grid-cols-2'
            )}
          >
            {isPrivate ? (
              <>
                <DeleteTripModal tripId={trip.id} />

                <Link
                  href={`/dashboard/manage-trips/${trip.id}/edit`}
                  className="py-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 dark:hover:text-neutral-400 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 transition-all focus-visible:dark:bg-neutral-800/70 focus-visible:dark:text-neutral-400 focus-visible:bg-neutral-100 outline-none"
                >
                  <PenBoxIcon size={17} strokeWidth={1.5} />
                  Edit
                </Link>
              </>
            ) : (
              <Link
                href={`/trips/${trip.id}`}
                className="text-center py-2 border-t dark:border-0 text-sm bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-800/60 hover:bg-neutral-200/70 transition-colors flex justify-center gap-1 items-center group lowercase font-mono dark:text-neutral-300 dark:hover:text-neutral-400"
              >
                Trip Details
                <ChevronRight className="size-5 text-neutral-400 dark:text-neutral-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </footer>
        </article>
      ))}
    </div>
  );
}
