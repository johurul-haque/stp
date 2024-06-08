'use client';

import { logout } from '@/actions/auth';
import gradient from '@/assets/gradient.svg';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';
import {
  LogOut,
  PlusIcon,
  Settings,
  SquareArrowOutUpRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ToastAction } from '../ui/toast';
import { toast } from '../ui/use-toast';
import { NAV_LINKS } from './nav-bar';

export function UserProfile({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await logout();
    } catch (error) {
      let message = 'Something went wrong!';

      if (error instanceof Error) message = error.message;

      toast({
        title: 'Uh oh! Could not process your request.',
        description: message,
        variant: 'destructive',
        action: (
          <ToastAction altText="Try again" onClick={handleLogout}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full focus-visible:ring-0 group"
        >
          <span className="sr-only">My Account</span>
          <span className="relative flex shrink-0 overflow-hidden rounded-full size-8 sm:size-9 group-focus-visible:ring-2 group-focus-visible:ring-slate-300">
            <Image
              alt={`Picture for ${user?.username}`}
              role="presentation"
              fill
              src={gradient}
            />
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <p className="text-sm font-medium leading-none mb-1">
            {user?.username}
          </p>
          <p className="text-xs leading-none opacity-70 font-light">
            {user?.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={'/dashboard/manage-trips/create'} className="w-full">
            Create trip
            <DropdownMenuShortcut>
              <PlusIcon className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={'/dashboard/account'} className="w-full">
            Account settings
            <DropdownMenuShortcut>
              <Settings className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <div className="xs:hidden">
          <DropdownMenuSeparator />

          {NAV_LINKS.map(({ label, href }) => (
            <DropdownMenuItem key={href} asChild>
              <Link
                href={href}
                className={cn('w-full', {
                  'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50':
                    pathname === href,
                })}
              >
                {label}
                <DropdownMenuShortcut>
                  <SquareArrowOutUpRight className="size-4 stroke-current" />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem asChild>
            <Link
              href={'/dashboard'}
              className={cn('w-full', {
                'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50':
                  pathname === '/dashboard',
              })}
            >
              Dashboard
              <DropdownMenuShortcut>
                <SquareArrowOutUpRight className="size-4 stroke-current" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <button
            className="w-full text-rose-600 focus:bg-rose-100 focus:text-rose-600"
            onClick={handleLogout}
            disabled={isLoading}
          >
            Log out
            <DropdownMenuShortcut>
              <LogOut className="size-4 stroke-current" />
            </DropdownMenuShortcut>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
