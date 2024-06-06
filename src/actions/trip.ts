'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { revalidatePath } from 'next/cache';

export async function deleteTrip(tripId: string) {
  try {
    await serverFetch.delete(`/api/trips/${tripId}`);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath('/', 'layout');
}
