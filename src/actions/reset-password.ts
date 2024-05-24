'use server';

import { serverFetch } from '@/lib/axios/server-fetch';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function resetPassword(payload: {
  current_password: string;
  new_password: string;
}) {
  try {
    const { data } = await serverFetch.post('/api/reset-password', payload);

    cookies().set('access_token', data.access_token);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.response?.data);
    }
    throw error;
  }
}
