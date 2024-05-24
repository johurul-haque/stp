'use server';

import { profileFormSchema } from '@/app/(home)/dashboard/account/_form/schema';
import { serverFetch } from '@/lib/axios/server-fetch';
import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';

export async function updateProfile(payload: profileFormSchema) {
  try {
    await serverFetch.put('/api/profile', payload);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.response?.data);
    }
  }

  revalidatePath('/');
}
