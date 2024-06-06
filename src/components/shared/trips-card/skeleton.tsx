import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  CalendarDaysIcon,
  ChevronRight,
  MapPinIcon,
  PenBoxIcon,
  Trash2Icon,
} from 'lucide-react';

export function TripsCardSkeleton({ isPrivate = false, length = 10 }) {
  return (
    <div className="grid max-sm:mx-auto max-sm:max-w-72 grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] @5xl:grid-cols-[repeat(auto-fill,minmax(31rem,1fr))] @6xl:grid-cols-[repeat(auto-fill,31rem)] justify-center gap-6 mt-6">
      {Array.from({ length }).map((_, i) => (
        <article key={i} className="flex flex-col @container">
          <div className="border dark:border-neutral-800 rounded-md rounded-b-none p-4 grid content-start @md:grid-cols-2 gap-4 items-start flex-1">
            <dl className="flex flex-col min-h-full gap-1.5">
              <dt className="sr-only">Destination</dt>
              <dd className="flex items-start gap-2 w-full">
                <MapPinIcon
                  aria-hidden
                  size={20}
                  className="text-neutral-400 dark:text-neutral-700 flex-shrink-0"
                />
                <Skeleton className="w-44 h-6" />
              </dd>

              <dt className="sr-only">Start and end date</dt>
              <dd className="flex items-center gap-3">
                <CalendarDaysIcon
                  size={16}
                  aria-hidden
                  className="text-neutral-400 dark:text-neutral-700 flex-shrink-0"
                />
                <Skeleton className="w-36 h-5" />
              </dd>

              <dt className="sr-only">Description</dt>
              <dd className="mt-2 dark:text-neutral-300 flex-1 flex flex-col">
                <Skeleton className="leading-5 w-full h-14 @md:h-auto @md:flex-1" />
              </dd>
            </dl>

            <Skeleton className="aspect-video max-w-full -order-1 @md:order-1" />
          </div>

          <footer
            className={cn(
              'border border-t-0 dark:border-0 rounded-b-md overflow-clip text-sm divide-x dark:divide-neutral-700 group font-mono dark:text-neutral-300 pointer-events-none',
              isPrivate && 'grid grid-cols-2'
            )}
          >
            {isPrivate ? (
              <>
                <button className="py-2 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 outline-none opacity-70">
                  <Trash2Icon size={17} strokeWidth={1.5} />
                  Delete
                </button>

                <div className="py-2 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 opacity-70">
                  <PenBoxIcon size={17} strokeWidth={1.5} />
                  Edit
                </div>
              </>
            ) : (
              <div className="text-center py-2 dark:border-0 text-sm bg-neutral-100 dark:bg-neutral-800 flex justify-center gap-1 items-center group lowercase font-mono dark:text-neutral-300 opacity-70">
                Trip Details
                <ChevronRight className="size-5 text-gray-600 dark:text-neutral-600" />
              </div>
            )}
          </footer>
        </article>
      ))}
    </div>
  );
}
