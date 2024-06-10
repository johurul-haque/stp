import { Separator } from '@/components/ui/separator';
import { getSingleTrip } from '@/lib/api/get-single-trip';
import { EditTripForm } from './_components/form';

type PageProps = {
  params: {
    tripId: string;
  };
};

export default async function EditPage({ params }: PageProps) {
  const { data } = await getSingleTrip(params.tripId);

  return (
    <main className="mt-6 space-y-6">
      <div>
        <h1 className="text-lg font-medium">Create your trip plan</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details and create a trip post to find your trip
          companions.
        </p>
      </div>

      <Separator />

      <EditTripForm trip={data} />
    </main>
  );
}
