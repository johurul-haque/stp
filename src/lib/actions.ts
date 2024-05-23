'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * @description Sets access_token cookie using the cookies function from next/headers and redirects to /dashboard.
 */
export async function setAccessToken(value: string) {
  cookies().set('access_token', value);
  redirect('/dashboard');
}
