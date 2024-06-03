'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateTrip<T>(payload: T, tripId: string) {
  try {
    await serverFetch.patch(`/api/trips/${tripId}`, payload);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath('/trips');
  revalidatePath('/dashboard', 'layout');
  redirect(`/trips/${tripId}`);
}
