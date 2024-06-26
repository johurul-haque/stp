import { Separator } from '@/components/ui/separator';
import { CreateTripForm } from './_components/form';

export default function CreateTripPage() {
  return (
    <div className="space-y-6 mt-6">
      <div>
        <h1 className="text-lg font-medium">Create your trip plan</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details and create a trip post to find your trip
          companions.
        </p>
      </div>
      <Separator />

      <CreateTripForm />
    </div>
  );
}
