'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinks = { label: string; href: string };

const NAV_LINKS: NavLinks[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-5 md:gap-6 max-md:text-sm font-medium">
      {NAV_LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'underline-offset-2 decoration-wavy decoration-green-700',
            {
              underline: href === pathname,
            }
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
