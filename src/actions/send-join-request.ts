'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendJoinRequest(tripId: string) {
  try {
    await serverFetch.post(`/api/trips/${tripId}/request`);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath(`/trips/${tripId}`);
  redirect(`/trips/${tripId}`);
}
