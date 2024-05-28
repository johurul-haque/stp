import { toast } from '@/components/ui/use-toast';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { SetStateActionType } from '@/types/set-state-action';
import axios from 'axios';
import type { RequestStatus } from './create-trip';
import { createTripFormSchema } from './schema';

type OnSubmitParams = {
  values: createTripFormSchema;
  setRequestStatus: SetStateActionType<RequestStatus | undefined>;
  setImageUploadProgress: SetStateActionType<number>;
};

export async function onSubmit({
  values,
  setRequestStatus,
  setImageUploadProgress,
}: OnSubmitParams) {
  setRequestStatus('uploading-image');

  const { images: imageFiles, ...restPayload } = values;

  try {
    const uploadFunctions = imageFiles.map((file) =>
      handleUpload(file, setImageUploadProgress)
    );

    const result = await Promise.all(uploadFunctions);

    const secureUrls = result.map((response) => response.data.secure_url);

    setRequestStatus('submitting-data');
  } catch (error) {
    const message = handleAxiosErrors(error, { returnMessage: true });

    toast({
      title: 'Uh oh! Could not process your request.',
      description: message,
      variant: 'destructive',
    });
  } finally {
    setRequestStatus(undefined);
  }
}

async function handleUpload(
  image: File,
  setProgress: SetStateActionType<number>
) {
  const formData = new FormData();

  formData.append('file', image);
  formData.append('folder', 'stp-a-9');
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  return axios.post('/upload-images', formData, {
    onUploadProgress: (ev) => {
      if (ev.progress === 1) {
        setProgress((prev) => prev + 1);
      }
    },
  });
}
