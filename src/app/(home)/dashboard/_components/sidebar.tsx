'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
  {
    title: 'General',
    href: '/dashboard',
    nested: true,
  },
  {
    title: 'Account',
    href: '/dashboard/account',
  },
];

type SidebarNavProps = React.HTMLAttributes<HTMLElement>;

export function SidebarNav({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 max-w-full overflow-x-auto',
        className
      )}
      {...props}
    >
      {sidebarNavItems.map((item) => {
        const isPathMatching = item.nested
          ? pathname.startsWith(item.href)
          : pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              isPathMatching
                ? 'dark:bg-neutral-800 bg-neutral-100'
                : 'hover:bg-transparent hover:dark:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
