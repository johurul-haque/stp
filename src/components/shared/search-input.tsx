'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cva } from 'class-variance-authority';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Badge } from '../ui/badge';

const groupStyles = cva(
  'flex gap-2 items-center h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white outline-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-neutral-950 has-[input:focus-visible]:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:has-[input:focus-visible]:ring-neutral-300 max-w-sm'
);

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchParams.get('page')) {
      params.delete('page');
    }

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 450);

  return (
    <div className={groupStyles()}>
      <label htmlFor="query">
        <SearchIcon
          className="dark:text-neutral-600 text-neutral-400"
          size={20}
        />
        <span className="sr-only">Search</span>
      </label>

      <input
        type="search"
        id="query"
        placeholder="Search trips"
        className="w-full border-0 outline-none bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <SearchTip />
    </div>
  );
}

function SearchTip() {
  return (
    <Popover>
      <PopoverTrigger>
        <span className="sr-only">Tip for date searches</span>
        <Badge variant={'outline'} className="text-opacity-70">
          ?
        </Badge>
      </PopoverTrigger>

      <PopoverContent className="px-3 w-full py-1.5 text-sm">
        <p>
          For date searches use <pre className="inline-block">y-m-d</pre>{' '}
          format.
        </p>
      </PopoverContent>
    </Popover>
  );
}