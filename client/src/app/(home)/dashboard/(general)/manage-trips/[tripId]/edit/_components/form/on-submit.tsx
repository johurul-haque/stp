import { updateTrip } from '@/actions/trip';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { SetStateActionType } from '@/types/set-state-action';
import { Trip } from '@/types/trips';
import axios from 'axios';
import type { RequestStatus } from '.';
import { updateTripFormSchema } from './schema';

type OnSubmitParams = {
  values: updateTripFormSchema;
  setRequestStatus: SetStateActionType<RequestStatus | undefined>;
  trip: Trip;
};

export async function onSubmit({
  values: formValues,
  setRequestStatus,
  trip,
}: OnSubmitParams) {
  setRequestStatus('uploading-image');

  const data = getUpdatedValues(formValues, trip);

  const { images: imageFiles } = formValues;

  try {
    let secureUrls;

    if (imageFiles) {
      const uploadFunctions = imageFiles.map(handleUpload);

      const result = await Promise.all(uploadFunctions);

      secureUrls = result.map((response) => response.data.secure_url);
    }

    setRequestStatus('submitting-data');

    const payload = {
      ...data,
      images: secureUrls,
    };

    if (Object.values(JSON.parse(JSON.stringify(payload))).length) {
      await updateTrip(payload, trip.id);
    } else {
      toast({
        title: 'Nothing to update. 😌',
        description: 'Everything is already up to date.',
      });
    }
  } catch (error) {
    let message = handleAxiosErrors(error, { returnMessage: true });

    if (error instanceof Error) {
      message = error.message;
    }

    toast({
      title: 'Uh oh! Could not process your request.',
      description: message,
      variant: 'destructive',
      action: (
        <ToastAction
          altText="Try again"
          onClick={() => {
            onSubmit({
              values: formValues,
              setRequestStatus,
              trip,
            });
          }}
        >
          Try again
        </ToastAction>
      ),
    });
  } finally {
    setRequestStatus(undefined);
  }
}

async function handleUpload(image: File) {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('folder', 'stp-a-9');
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  return axios.post('/upload-image', formData);
}

function getUpdatedValues(
  formValues: updateTripFormSchema,
  currentTrip: Trip
): Partial<Trip> {
  const updatedTrip: Partial<Trip> = {};

  const fields = ['destination', 'description', 'travelType'] as const;

  fields.forEach((field) => {
    if (formValues[field] !== currentTrip[field]) {
      updatedTrip[field] = formValues[field]!;
    }
  });

  const { from, to } = formValues.date;
  const formStartDate = from.toISOString().split('T')[0];
  const formEndDate = to.toISOString().split('T')[0];

  if (!currentTrip.startDate.includes(formStartDate)) {
    updatedTrip.startDate = formStartDate;
  }

  if (!currentTrip.endDate.includes(formEndDate)) {
    updatedTrip.endDate = formEndDate;
  }

  return updatedTrip;
}
