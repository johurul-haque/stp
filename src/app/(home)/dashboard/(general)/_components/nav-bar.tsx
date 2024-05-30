'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BadgePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    label: 'Manage trips',
    href: '/dashboard/manage-trips',
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
    <nav className="flex justify-between">
      <div className="inline-flex items-center justify-center rounded-md bg-[hsl(240_4.8%_95.9%)] dark:bg-neutral-800 p-1 dark:text-[hsl(240_5%_64.9%)] text-[hsl(240_3.8%_46.1%)]">
        {NAV_ITEMS.map(({ label, href, startsWith }) => {
          const isPathMatching = startsWith
            ? href.includes(pathname)
            : pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                {
                  'bg-white dark:bg-[hsl(240_10%_3.9%)] shadow-sm text-[hsl(240_10%_3.9%)] dark:text-[hsl(0_0%_98%)]':
                    isPathMatching,
                }
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
