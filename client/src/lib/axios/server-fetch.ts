import { cookies } from 'next/headers';
import { instance } from './instance';

export const serverFetch = instance;

serverFetch.interceptors.request.use((config) => {
  const access_token = cookies().get('access_token');

  config.headers.Authorization = access_token?.value;
  return config;
});
