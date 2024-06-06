import { cn } from '@/lib/utils';
import { PenBoxIcon, SendIcon } from 'lucide-react';
import Link from 'next/link';

export function JoinRequestButton({
  requestStatus,
  user,
  tripId,
  isUsersPost,
}: PropsType) {
  if (isUsersPost) {
    return (
      <Link
        href={`/dashboard/manage-trips/${tripId}/edit`}
        className="py-1.5 px-6 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 dark:hover:text-neutral-400 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 transition-all focus-visible:dark:bg-neutral-800/70 focus-visible:dark:text-neutral-400 focus-visible:bg-neutral-100 outline-none text-sm font-mono rounded-full max-w-fit"
      >
        <PenBoxIcon size={16} strokeWidth={1.5} />
        Edit
      </Link>
    );
  }

  if (!requestStatus) {
    return (
      <>
        <Link
          aria-disabled={!user}
          href={`/dashboard/manage-trips/${tripId}/send-request`}
          className="rounded-full flex items-center gap-2.5 justify-center text-sm hover:bg-emerald-700 transition-all bg-emerald-600 text-emerald-50 px-4 py-1.5 max-w-fit aria-disabled:opacity-60 aria-disabled:pointer-events-none group"
        >
          <SendIcon
            size={18}
            className="group-hover:rotate-45 transition-transform duration-300"
          />
          Send request
        </Link>

        {!user && (
          <Link
            href={`/login?redirect_from=/trips/${tripId}`}
            className="underline underline-offset-2 text-xs font-light opacity-80"
          >
            Requires login
          </Link>
        )}
      </>
    );
  }

  return (
    <div className="flex items-center gap-2 justify-self-end self-start pl-3 pr-4 py-1 border dark:border-neutral-800 rounded-full max-w-fit">
      <div
        title={requestStatus.toLowerCase()}
        className="relative flex size-3"
        aria-hidden
      >
        <div
          className={cn(
            'absolute inline-flex size-full animate-ping rounded-full opacity-75',
            {
              'bg-amber-500': requestStatus === 'PENDING',
              'bg-emerald-500': requestStatus === 'APPROVED',
            }
          )}
        />
        <div
          className={cn('relative inline-flex rounded-full size-full', {
            'bg-amber-500': requestStatus === 'PENDING',
            'bg-emerald-500': requestStatus === 'APPROVED',
          })}
        />
      </div>
      <span className="text-sm font-mono">Request sent</span>
    </div>
  );
}

type PropsType = {
  requestStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: boolean;
  tripId: string;
  isUsersPost: boolean;
};
