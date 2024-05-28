'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTrip<T>(payload: T) {
  try {
    await serverFetch.post('/api/trips', payload);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath('/trips');
  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
