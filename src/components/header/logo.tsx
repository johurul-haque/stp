import { cn } from '@/lib/utils';
import { TreePalm } from 'lucide-react';
import { Atma } from 'next/font/google';
import Link from 'next/link';

type LogoProps = {
  className?: {
    wrapper?: string;
    logo?: string;
  };
};

const atma = Atma({ subsets: ['latin'], weight: ['600', '700'] });

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={'/'}
      className={cn(
        'relative z-20 flex gap-1.5 items-start select-none',
        className?.wrapper
      )}
    >
      <TreePalm
        strokeWidth={1.7}
        className={cn(
          'size-6 text-green-600 dark:text-green-700',
          className?.logo
        )}
      />
      <abbr
        title="Social Travel Platform"
        className={`${atma.className} font-bold text-lg md:text-xl tracking-wider text-green-950 dark:text-green-100 no-underline`}
      >
        STP
      </abbr>
    </Link>
  );
}
