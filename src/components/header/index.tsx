import { getUser } from '@/lib/api/get-user';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Logo } from './logo';
import { NavBar } from './nav-bar';
import { UserProfile } from './user-profile';

export async function Header() {
  const user = await getUser();

  return (
    <header className="container py-4 lg:py-5 relative flex justify-between items-center">
      <Link href={'/'}>
        <Logo
          className={{
            wrapper: 'text-lg font-bold',
            logo: 'md:size-7',
          }}
        />
      </Link>

      <NavBar />

      {user ? (
        <UserProfile user={user.data} />
      ) : (
        <Link
          href={'/login'}
          className={buttonVariants({ variant: 'outline' })}
        >
          Login
        </Link>
      )}
    </header>
  );
}
