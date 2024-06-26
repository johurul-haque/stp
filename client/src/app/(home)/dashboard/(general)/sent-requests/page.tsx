import { Separator } from '@/components/ui/separator';
import { getAllSentRequests } from '@/lib/api/get-all-sent-request';
import { cn } from '@/lib/utils';
import { ChevronRight, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

export default async function SentRequestsPage() {
  const { data } = await getAllSentRequests();

  return (
    <main>
      <div className="my-6">
        <h1 className="text-lg font-medium mb-0.5">Sent requests status</h1>
        <p className="text-sm">
          {
            "Status of the requests you've sent to a particular trip to join as a companion."
          }
        </p>
      </div>

      <Separator />

      <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-6 mt-6">
        {data.map((request) => (
          <article
            key={request.id}
            className="border dark:border-neutral-800 rounded-md overflow-clip"
          >
            <dl className="grid grid-cols-2 gap-2 px-3 pt-3 sm:px-4 sm:pt-4">
              <dt className="sr-only">Destination</dt>
              <dd className="flex items-start gap-2">
                <MapPinIcon
                  aria-hidden
                  className="text-neutral-400 dark:text-neutral-700 flex-shrink-0"
                />
                <span className="line-clamp-2 text-sm">
                  {request.trip.destination}
                </span>
              </dd>

              <dt className="sr-only">Status</dt>
              <dd
                className={cn(
                  'flex items-center gap-2 py-0.5 px-2 rounded-full justify-self-end self-start'
                )}
              >
                <div className="relative flex size-3" aria-hidden>
                  <div
                    className={cn(
                      'absolute inline-flex size-full animate-ping rounded-full opacity-75',
                      {
                        'bg-amber-500': request.status === 'PENDING',
                        'bg-emerald-500': request.status === 'APPROVED',
                      }
                    )}
                  />
                  <div
                    className={cn(
                      'relative inline-flex rounded-full size-full',
                      {
                        'bg-amber-500': request.status === 'PENDING',
                        'bg-emerald-500': request.status === 'APPROVED',
                      }
                    )}
                  />
                </div>
                <span className="text-sm capitalize">
                  {request.status.toLowerCase()}
                </span>
              </dd>
            </dl>

            <Link
              href={`/trips/${request.tripId}`}
              className="text-center py-2 border-t dark:border-0 mt-4 text-sm bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-800/60 hover:bg-neutral-200/70 transition-colors flex justify-center gap-1 items-center group lowercase font-mono dark:text-neutral-300 dark:hover:text-neutral-400"
            >
              Trip Details
              <ChevronRight className="size-5 text-gray-600 dark:text-neutral-600 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
