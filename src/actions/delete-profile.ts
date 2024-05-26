'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function deleteProfile(password: string) {
  try {
    await serverFetch.delete('/api/profile', {
      data: { password },
    });

    cookies().delete('access_token');
  } catch (error) {
    handleAxiosErrors(error);
  }

  redirect('/login');
}
