import { setAccessToken } from '@/lib/actions';
import { clientFetch } from '@/lib/axios/client-fetch';
import { SetStateActionType } from '@/types/set-state-action';
import { AxiosError } from 'axios';
import { RegisterResponse } from './response-type';
import { registerSchema } from './schema';

type ParamsType = {
  values: registerSchema;
  setIsLoading: SetStateActionType<boolean>;
  setError: SetStateActionType<string | undefined>;
};

export async function onSubmit({ values, setIsLoading, setError }: ParamsType) {
  setIsLoading(true);

  const { confirm_password, ...payload } = values;

  try {
    const { data } = await clientFetch.post<RegisterResponse>(
      '/api/register',
      payload
    );

    setAccessToken(data.access_token);
  } catch (error) {
    if (error instanceof AxiosError) {
      setError(error.response?.data.message ?? error.response?.data);
    } else {
      setError('Something went wrong!');
    }
  } finally {
    setIsLoading(false);
  }
}
