'use server';

import { handleAxiosErrors } from '@/lib/axios/handle-errors';
import { serverFetch } from '@/lib/axios/server-fetch';
import { revalidatePath } from 'next/cache';

type Payload = {
  role?: 'ADMIN' | 'USER';
  status?: 'ACTIVE' | 'INACTIVE';
};

export async function handleInfoChange(userId: string, payload: Payload) {
  try {
    await serverFetch.patch(`/api/manage-users/${userId}`, payload);
  } catch (error) {
    handleAxiosErrors(error);
  }

  revalidatePath('/dashboard/manage-users');
}
