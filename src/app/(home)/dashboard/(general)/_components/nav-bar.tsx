'use client';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    label: 'Your posts',
    href: '/dashboard/your-posts',
    startsWith: true,
  },
  {
    label: 'Sent requests',
    href: '/dashboard/sent-requests',
  },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="mb-4 space-x-3">
      {NAV_ITEMS.map(({ label, href, startsWith }) => {
        const isPathMatching = startsWith
          ? href.includes(pathname)
          : pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={buttonVariants({
              variant: isPathMatching ? 'default' : 'secondary',
              size: 'sm',
            })}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
