import { PlateEditor } from '@/components/plate-editor';
import { PreviewImagesCarousel } from '@/components/shared/trips-card/preview-images';
import { getSingleTrip } from '@/lib/api/get-single-trip';
import { format } from 'date-fns';

type PropsType = {
  params: { tripId: string };
};

export default async function TripPage({ params }: PropsType) {
  const { data } = await getSingleTrip(params.tripId);

  let description;

  try {
    const parsedValues = JSON.parse(data.description);
    description = (
      <PlateEditor
        initialValue={parsedValues}
        className="min-h-full"
        readOnly
      />
    );
  } catch (error) {
    description = data.description;
  }

  return (
    <main className="container max-h-full flex-1 flex gap-8 py-8">
      <div className="max-w-xl">
        <PreviewImagesCarousel
          images={data.images}
          destination={data.destination}
        />
      </div>

      <dl className="max-h-full flex flex-col flex-1 overflow-y-auto">
        <dt className="uppercase text-xs tracking-wide opacity-75">
          Destination
        </dt>
        <dd>{data.destination}</dd>

        <dt className="uppercase text-xs tracking-wide opacity-75 mt-4">
          Date
        </dt>
        <dd>
          {format(data.startDate, 'LLL dd, y')} -{' '}
          {format(data.endDate, 'LLL dd, y')}
        </dd>

        <dt className="uppercase text-xs tracking-wide opacity-75 mt-4 mb-1">
          travel type
        </dt>
        <dd className="px-4 py-0.5 rounded-full text-sm font-mono text-emerald-900 bg-emerald-100 max-w-fit">
          {data.travelType}
        </dd>

        <dt className="uppercase text-xs tracking-wide opacity-75 mt-4 mb-1">
          Description
        </dt>
        <dd className="flex-1">{description}</dd>
      </dl>
    </main>
  );
}
