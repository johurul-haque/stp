'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function resetPassword(payload: {
  current_password: string;
  new_password: string;
}) {
  try {
    const { data } = await serverFetch.post('/api/reset-password', payload);

    cookies().set('access_token', data.access_token);
  } catch (error) {
    handleAxiosErrors(error);
  }
}

export async function logout() {
  cookies().delete('access_token');

  revalidatePath('/');
  redirect('/');
}
