import { buttonVariants } from '@/components/plate-ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function LinkWithRedirectUrl() {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const redirectFrom = searchParams.get('redirect_from');

  return (
    <Link
      href={generateHref(pathname, redirectFrom)}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute right-4 top-4 md:right-8 md:top-8'
      )}
    >
      {pathname === '/register' ? 'Login' : 'Register'}
    </Link>
  );
}

function generateHref(pathname: string, redirect_from: string | null) {
  let href;

  if (pathname === '/register') {
    href = '/login';
  } else {
    href = '/register';
  }

  return redirect_from ? `${href}?redirect_from=${redirect_from}` : href;
}
