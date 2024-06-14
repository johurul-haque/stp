"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * @description Sets access_token cookie using the cookies function from next/headers and redirects to /dashboard.
 */
export async function setAccessToken(value: string, redirectTo: string | null) {
  const oneDay = 24 * 60 * 60 * 1000;

  cookies().set("access_token", value, {
    secure: true,
    httpOnly: true,
    expires: Date.now() + oneDay,
  });

  redirect(redirectTo || "/dashboard");
}
