import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Logo } from './logo';
import { NavBar } from './nav-bar';

export function Header() {
  return (
    <header className="container py-4 lg:py-5 relative flex justify-between items-center">
      <Logo
        className={{
          wrapper: 'text-lg font-semibold',
          logo: 'md:size-7',
        }}
      />

      <NavBar />

      <Link href={'/login'} className={buttonVariants({ variant: 'outline' })}>
        Login
      </Link>
    </header>
  );
}
