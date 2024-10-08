import { PreviewImagesCarousel } from '@/components/shared/trips-card/preview-images';
import { Badge } from '@/components/ui/badge';
import { getSingleTrip } from '@/lib/api/get-single-trip';
import { getUser } from '@/lib/api/get-user';
import { format } from 'date-fns';
import { JoinRequestButton } from './_components/join-request-button';

type PropsType = {
  params: { tripId: string };
};

export default async function TripPage({ params }: PropsType) {
  const [{ data: trip }, user] = await Promise.all([
    getSingleTrip(params.tripId),
    getUser(),
  ]);

  const requestStatus = trip?.TravelPairRequest?.[0]?.status;
  const isUsersPost = trip.userId === user?.data.id;

  return (
    <main className="container lg:min-h-[40rem] flex max-xl:max-w-xl max-xl:flex-col gap-8 py-8">
      <div className="max-w-xl">
        <PreviewImagesCarousel
          images={trip.images}
          destination={trip.destination}
        />
      </div>

      <dl className="xl:max-h-full flex flex-col xl:flex-1 xl:overflow-y-auto pb-6">
        <div className="grid xs:grid-cols-2 gap-y-6 xs:gap-y-5">
          <div>
            <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mb-0.5">
              Destination
            </dt>
            <dd>{trip.destination}</dd>
          </div>

          <div>
            <dt className="uppercase text-xs tracking-wide font-medium opacity-70 mb-0.5">
              Date
            </dt>
            <dd>
              {format(trip.startDate, 'LLL dd, y')} -{' '}
              {format(trip.endDate, 'LLL dd, y')}
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mb-2">
              travel type
            </dt>
            <dd>
              <Badge className="font-medium" variant="secondary">
                {trip.travelType}
              </Badge>
            </dd>
          </div>

          <div>
            <dt className="uppercase text-xs tracking-wide font-medium opacity-70 mb-2">
              {isUsersPost ? 'Action' : 'Become companion'}
            </dt>
            <dd>
              <JoinRequestButton
                isUsersPost={isUsersPost}
                user={!!user}
                tripId={trip.id}
                requestStatus={requestStatus}
              />

              {/* !Temporary */}
              {isUsersPost && (
                <p className="text-xs mt-1">
                  {"You can't send join request to your own post."}
                </p>
              )}
            </dd>
          </div>
        </div>

        <dt className="uppercase text-xs font-medium tracking-wide opacity-70 mt-6 xs:mt-5 mb-2">
          Description
        </dt>
        <dd className="flex-1">{trip.description}</dd>
      </dl>
    </main>
  );
}
