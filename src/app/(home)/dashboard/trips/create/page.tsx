'use client';

import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { CreateTripForm } from './_components/form/create-trip';

export default function CreateTripPage() {
  const [error, setError] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Post your trip plan</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details and create a trip post to find your trip
          companions.
        </p>
      </div>
      <Separator />

      <CreateTripForm setError={setError} />
    </div>
  );
}
