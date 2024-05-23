'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setCookies(value: string) {
  cookies().set('access_token', value);
  redirect('/dashboard');
}
