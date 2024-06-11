import { buttonVariants } from '@/components/ui/button';
import { atma } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { RedoIcon } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="flex-1 grid place-items-center content-center min-h-[42rem] relative text-center">
      <h1
        className={cn(
          atma.className,
          'font-bold text-3xl min-[300px]:text-4xl xs:text-5xl sm:text-6xl mb-3.5 text-emerald-950 dark:text-emerald-100'
        )}
      >
        Find your travel <br /> companions.
      </h1>

      <p className="max-w-[18rem] xs:max-w-sm text-sm mx-auto leading-5 font-mono">
        Find interested people to join you with your journey 🫂.
      </p>

      <div className="flex gap-3 my-6">
        <div className="relative">
          <RedoIcon className="absolute size-10 -rotate-45 left-0 -translate-x-full -bottom-1/2 -translate-y-[30%] text-green-600 dark:text-green-700 opacity-60" />

          <Link
            href={'/dashboard/manage-trips/create'}
            className={buttonVariants({ className: 'shadow-md' })}
          >
            Share trip
          </Link>
        </div>

        <Link
          href={'/trips'}
          className={buttonVariants({
            variant: 'outline',
            className: 'shadow-md',
          })}
        >
          View trips
        </Link>
      </div>
    </section>
  );
}
