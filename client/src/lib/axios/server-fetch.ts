import axios from 'axios';
import { cookies } from 'next/headers';
import { axiosDefaults } from './defaults';

export const serverFetch = axios.create(axiosDefaults);

serverFetch.interceptors.request.use((config) => {
  const access_token = cookies().get('access_token');

  config.headers.Authorization = access_token?.value;
  return config;
});
