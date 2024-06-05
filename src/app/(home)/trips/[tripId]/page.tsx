import { PlateEditor } from '@/components/plate-editor';
import { PreviewImagesCarousel } from '@/components/shared/trips-card/preview-images';
import { getSingleTrip } from '@/lib/api/get-single-trip';
import { getUser } from '@/lib/api/get-user';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { SendIcon } from 'lucide-react';
import Link from 'next/link';

type PropsType = {
  params: { tripId: string };
};

export default async function TripPage({ params }: PropsType) {
  const [trip, user] = await Promise.all([
    getSingleTrip(params.tripId),
    getUser(),
  ]);

  const requestStatus = trip.data?.TravelPairRequest?.[0].status;

  let description;
  try {
    const parsedValues = JSON.parse(trip.data.description);
    description = (
      <PlateEditor
        initialValue={parsedValues}
        className="min-h-full"
        readOnly
      />
    );
  } catch (error) {
    description = trip.data.description;
  }

  return (
    <main className="container max-h-full flex-1 flex gap-8 py-8">
      <div className="max-w-xl">
        <PreviewImagesCarousel
          images={trip.data.images}
          destination={trip.data.destination}
        />
      </div>

      <dl className="max-h-full flex flex-col flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <dt className="uppercase text-xs font-medium tracking-wide opacity-70">
              Destination
            </dt>
            <dd>{trip.data.destination}</dd>
          </div>

          <div>
            <dt className="uppercase text-xs tracking-wide font-medium opacity-70">
              Date
            </dt>
            <dd>
              {format(trip.data.startDate, 'LLL dd, y')} -{' '}
              {format(trip.data.endDate, 'LLL dd, y')}
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mb-1">
              travel type
            </dt>
            <dd className="px-4 py-0.5 rounded-full text-sm font-mono text-emerald-900 bg-emerald-100 max-w-fit">
              {trip.data.travelType}
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs tracking-wide font-medium opacity-70 mb-1">
              Become companion
            </dt>
            {!requestStatus ? (
              <dd>
                {
                  <Link
                    aria-disabled={!user}
                    href={`/dashboard/manage-trips/${trip.data.id}/send-request`}
                    className="rounded-full flex items-center gap-2.5 justify-center text-sm hover:bg-emerald-700 transition-all bg-emerald-600 text-emerald-50 px-4 py-1.5 max-w-fit aria-disabled:opacity-60 aria-disabled:pointer-events-none group"
                  >
                    <SendIcon
                      size={18}
                      className="group-hover:rotate-45 transition-transform duration-300"
                    />
                    Send request
                  </Link>
                }

                {!user && (
                  <Link
                    href={`/login?redirected_from=/trips/${trip.data.id}`}
                    className="underline underline-offset-2 text-xs font-light opacity-80"
                  >
                    Requires login
                  </Link>
                )}
              </dd>
            ) : (
              <dd className="flex items-center gap-2 justify-self-end self-start pl-3 pr-4 py-1 border rounded-full max-w-fit">
                <div
                  title={requestStatus.toLowerCase()}
                  className="relative flex size-3"
                  aria-hidden
                >
                  <div
                    className={cn(
                      'absolute inline-flex size-full animate-ping rounded-full opacity-75',
                      {
                        'bg-amber-500': requestStatus === 'PENDING',
                        'bg-emerald-500': requestStatus === 'APPROVED',
                      }
                    )}
                  />
                  <div
                    className={cn(
                      'relative inline-flex rounded-full size-full',
                      {
                        'bg-amber-500': requestStatus === 'PENDING',
                        'bg-emerald-500': requestStatus === 'APPROVED',
                      }
                    )}
                  />
                </div>
                <span className="text-sm font-mono">Request sent</span>
              </dd>
            )}
          </div>
        </div>

        <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mt-4 mb-1">
          Description
        </dt>
        <dd className="flex-1">{description}</dd>
      </dl>
    </main>
  );
}
