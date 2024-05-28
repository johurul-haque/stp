import { clientFetch } from '@/lib/axios/client-fetch';
import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { setAccessToken } from '@/lib/cookies';
import { SetStateActionType } from '@/types/set-state-action';
import { z } from 'zod';
import { LoginResponse } from './response-type';
import { loginSchema } from './schema';

type ParamsType = {
  values: loginSchema;
  setIsLoading: SetStateActionType<boolean>;
  setError: SetStateActionType<string | undefined>;
};

export async function onSubmit({ values, setIsLoading, setError }: ParamsType) {
  setIsLoading(true);

  const payload = {
    password: values.password,
    email: undefined,
    username: undefined,
  };

  const { success } = z.string().email().safeParse(values.handle);

  if (success) {
    payload.email = values.handle as any;
  } else {
    payload.username = values.handle as any;
  }

  try {
    const { data } = await clientFetch.post<LoginResponse>(
      '/api/login',
      payload
    );

    setAccessToken(data.access_token);
  } catch (error) {
    handleAxiosErrors(error, { setError });
  } finally {
    setIsLoading(false);
  }
}
