import { SetStateActionType } from '@/types/set-state-action';
import { AxiosError } from 'axios';

/**
 * @description This function is for checking if it's instance of AxiosError and throwing back an error with a message.
 */
export function handleAxiosErrors(
  error: unknown,
  setError?: SetStateActionType<string | undefined>
) {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data.message ||
      error.response?.data ||
      'Something went wrong on our side. Hire Johurul(😎) to fix this.';

    if (setError) return setError(message);

    throw new Error(message);
  }
}
