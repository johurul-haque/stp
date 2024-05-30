'use client';

import { Trip } from '@/types/trips';
import { format } from 'date-fns';
import {
  CalendarDaysIcon,
  MapPinIcon,
  PenBoxIcon,
  Trash2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function TripsCards({ data }: { data: Trip[] }) {
  return (
    <div className="grid max-sm:mx-auto max-sm:max-w-72 grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] 2xl:grid-cols-[repeat(auto-fill,31rem)] justify-center gap-6 mt-6">
      {[...data, ...data, ...data].map((trip) => (
        <article key={trip.id} className="flex flex-col">
          <div className="border border-b-0 dark:border-neutral-800 rounded-md rounded-b-none p-4 grid 2xl:grid-cols-2 gap-4 items-start flex-1">
            <dl className="grid gap-1.5">
              <dt className="sr-only">Destination</dt>
              <dd className="flex items-start gap-2">
                <MapPinIcon
                  aria-hidden
                  size={20}
                  className="text-neutral-400 dark:text-neutral-700 flex-shrink-0"
                />
                <span className="line-clamp-2 tracking-wide max-xl:text-sm dark:text-neutral-300">
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

            <div className="relative overflow-clip rounded group max-2xl:-order-1">
              <Image
                src={trip.images[0]}
                className="aspect-video object-cover max-w-full"
                alt={`Image for ${trip.destination}`}
                width={800}
                height={800}
              />
              {!!(trip.images.length - 1) && (
                <div className="bg-neutral-950/60 py-1 text-xs text-center absolute bottom-0 inset-x-0">
                  +{trip.images.length - 1} more{' '}
                  <span className="sr-only">images</span>
                </div>
              )}

              <button
                onClick={() => console.log('clicked')}
                className="absolute inset-0 text-xs tracking-wider text-neutral-300 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-all focus-visible:opacity-100"
              >
                View image(s)
              </button>
            </div>
          </div>

          <footer className="border-t dark:border-t-0 rounded-b-md overflow-clip text-sm divide-x dark:divide-neutral-700 grid grid-cols-2 group font-mono dark:text-neutral-300">
            <button className="hover:bg-rose-100 hover:text-rose-900 dark:hover:bg-rose-800/60 dark:hover:text-rose-100 py-2 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 transition-all focus-visible:dark:bg-rose-800/60 focus-visible:dark:text-rose-100 focus-visible:bg-rose-100 focus-visible:text-rose-900 outline-none">
              <Trash2Icon size={17} strokeWidth={1.5} />
              Delete
            </button>

            <Link
              href={`trips/${trip.id}/edit`}
              className="py-2 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 dark:hover:text-neutral-400 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 transition-all focus-visible:dark:bg-neutral-800/70 focus-visible:dark:text-neutral-400 focus-visible:bg-neutral-100 outline-none
              "
            >
              <PenBoxIcon size={17} strokeWidth={1.5} />
              Edit
            </Link>
          </footer>
        </article>
      ))}
    </div>
  );
}
