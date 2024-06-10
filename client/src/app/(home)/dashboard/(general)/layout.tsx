import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NavBar } from './_components/nav-bar';

export default async function GeneralPageLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const accessToken = cookies().get('access_token');
  const jwtPayload = jwtDecode(accessToken!.value) as any;

  return (
    <>
      <NavBar role={jwtPayload?.role} />
      {children}
    </>
  );
}
