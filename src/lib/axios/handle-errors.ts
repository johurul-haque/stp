import { SetStateActionType } from '@/types/set-state-action';
import { AxiosError } from 'axios';

type OptionsType = {
  setError?: SetStateActionType<string | undefined>;
  returnMessage?: boolean;
};

export function handleAxiosErrors(error: unknown, options?: OptionsType) {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.message ||
      (error.response?.data?.includes('DOCTYPE html')
        ? 'Something went wrong! Hire Johurul(😎) to fix this.'
        : error.response?.data);

    if (options?.setError) {
      options.setError(message);
    }

    if (options?.returnMessage) {
      return message;
    }

    throw new Error(message);
  }
}
