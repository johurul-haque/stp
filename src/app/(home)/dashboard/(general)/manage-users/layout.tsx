import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const accessToken = cookies().get('access_token');

  const jwtPayload = jwtDecode(accessToken!.value) as any;

  if (jwtPayload?.role === 'ADMIN') notFound();

  return children;
}
