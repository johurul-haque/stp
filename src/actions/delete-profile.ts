'use server';

import { serverFetch } from '@/lib/axios/server-fetch';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteProfile(password: string) {
  try {
    await serverFetch.delete('/api/profile', {
      data: { password },
    });

    cookies().delete('access_token');
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.response?.data);
    }
  }

  redirect('/login');
}
