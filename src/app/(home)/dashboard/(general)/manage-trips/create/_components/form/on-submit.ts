import { createTrip } from '@/actions/create-trip';
import { toast } from '@/components/ui/use-toast';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { SetStateActionType } from '@/types/set-state-action';
import axios from 'axios';
import type { RequestStatus } from '.';
import { createTripFormSchema } from './schema';

type OnSubmitParams = {
  values: createTripFormSchema;
  setRequestStatus: SetStateActionType<RequestStatus | undefined>;
};

export async function onSubmit({ values, setRequestStatus }: OnSubmitParams) {
  setRequestStatus('uploading-image');

  const { images: imageFiles, date, ...data } = values;

  try {
    const uploadFunctions = imageFiles.map(handleUpload);

    const result = await Promise.all(uploadFunctions);

    const secureUrls = result.map((response) => response.data.secure_url);

    setRequestStatus('submitting-data');

    const payload = {
      ...data,
      images: secureUrls,
      startDate: date.from,
      endDate: date.to,
    };

    await createTrip(payload);
  } catch (error) {
    let message = handleAxiosErrors(error, { returnMessage: true });

    if (error instanceof Error) {
      message = error.message;
    }

    toast({
      title: 'Uh oh! Could not process your request.',
      description: message,
      variant: 'destructive',
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
