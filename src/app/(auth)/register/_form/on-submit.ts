import { clientFetch } from '@/lib/axios/client-fetch';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { setAccessToken } from '@/lib/cookies';
import { SetStateActionType } from '@/types/set-state-action';
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
    handleAxiosErrors(error, { setError });
  } finally {
    setIsLoading(false);
  }
}
