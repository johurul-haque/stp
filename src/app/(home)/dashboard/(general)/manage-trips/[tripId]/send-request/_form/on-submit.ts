import { sendJoinRequest } from '@/actions/send-join-request';
import { toast } from '@/components/ui/use-toast';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { SetStateActionType } from '@/types/set-state-action';
import { RequestStatus } from '.';
import { formSchema } from './schema';

type ParamsType = {
  values: formSchema;
  tripId: string;
  setRequestStatus: SetStateActionType<RequestStatus | undefined>;
};

export async function onSubmit({ tripId, setRequestStatus }: ParamsType) {
  setRequestStatus('submitting');

  try {
    await sendJoinRequest(tripId);
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
