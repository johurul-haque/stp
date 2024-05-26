import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ChevronRight, MapPinIcon, PlaneIcon } from 'lucide-react';
import Link from 'next/link';

export default async function SentRequestsPage() {
  const data = [...new Array(15)];

  return (
    <main>
      <div className="my-6">
        <h1 className="text-lg font-medium">Sent requests status</h1>
        <p className="text-sm">
          {
            "Status of the requests you've sent to a particular trip to join as a companion."
          }
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6 mt-6">
        {data.map((_, i) => (
          <article key={i} className="border rounded-md overflow-clip">
            <dl className="grid grid-cols-2 gap-2 px-4 pt-4">
              <dt className="sr-only">Destination</dt>
              <dd className="flex items-start gap-3">
                <MapPinIcon
                  aria-hidden
                  className="text-gray-600 flex-shrink-0"
                />
                <span className="line-clamp-2">Germany</span>
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
                        'bg-amber-500': true,
                        'bg-emerald-500': false,
                      }
                    )}
                  />
                  <div
                    className={cn(
                      'relative inline-flex rounded-full size-full',
                      {
                        'bg-amber-500': true,
                        'bg-emerald-500': false,
                      }
                    )}
                  />
                </div>
                <span className="text-sm capitalize">
                  {'PENDING'.toLowerCase()}
                </span>
              </dd>

              <dt className="sr-only">Trip</dt>
              <dd className="flex gap-3 col-span-full text-sm text-neutral-700/80">
                <PlaneIcon aria-hidden className="text-gray-400 size-5" />
                <span>by {'johurul_haque'}</span>
              </dd>
            </dl>
            <Link
              href={'/'}
              className="text-center py-2 border-t mt-4 text-sm bg-gray-100 hover:bg-gray-200/70 transition-colors flex justify-center gap-1 items-center group"
            >
              Trip Details
              <ChevronRight className="size-5 text-gray-600 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
