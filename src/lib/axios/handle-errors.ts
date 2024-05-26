import { AxiosError } from 'axios';

/**
 * @description This function is for checking if it's instance of AxiosError and throwing back an error with a message.
 */
export function handleAxiosErrors(error: unknown) {
  if (error instanceof AxiosError) {
    throw new Error(
      error.response?.data.message ||
        error.response?.data ||
        'Something went wrong on our side.'
    );
  }
}
