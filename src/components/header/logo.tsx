import { atma } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { TreePalm } from 'lucide-react';

type LogoProps = {
  className?: {
    wrapper?: string;
    logo?: string;
    abbr?: string;
  };
};

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn(
        'relative z-20 flex gap-1.5 items-start select-none font-bold max-md:text-lg text-xl tracking-wider',
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
        className={cn(
          `${atma.className} bg-gradient-to-t from-green-900 to-green-600 dark:from-green-300/90 dark:to-green-50/85 text-transparent bg-clip-text inline-block no-underline antialiased`,
          className?.abbr
        )}
      >
        STP
      </abbr>
    </div>
  );
}
