import { sendJoinRequest } from '@/actions/trip';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { SetStateActionType } from '@/types/set-state-action';
import { FormStatus } from '.';
import { formSchema } from './schema';

type ParamsType = {
  values?: formSchema;
  tripId: string;
  setFormStatus: SetStateActionType<FormStatus | undefined>;
};

export async function onSubmit({ tripId, setFormStatus }: ParamsType) {
  setFormStatus('submitting');

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
      action: (
        <ToastAction
          altText="Try again"
          onClick={() => onSubmit({ tripId, setFormStatus: setFormStatus })}
        >
          Try again
        </ToastAction>
      ),
    });
  } finally {
    setFormStatus(undefined);
  }
}
