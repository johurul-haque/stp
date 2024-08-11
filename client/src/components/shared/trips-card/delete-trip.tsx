'use client';

import { deleteTrip } from '@/actions/trip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

export function DeleteTripModal({ tripId }: { tripId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await deleteTrip(tripId);
    } catch (error) {
      let message = 'Something went wrong!';

      if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: 'Uh oh! Could not process your request.',
        description: message,
        variant: 'destructive',
        action: (
          <ToastAction altText="Try again" onClick={handleDelete}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="hover:bg-rose-100 hover:text-rose-900 dark:hover:bg-rose-800/60 dark:hover:text-rose-100 py-2 flex justify-center items-center gap-2 bg-neutral-100 dark:bg-neutral-800 transition-all focus-visible:dark:bg-rose-800/60 focus-visible:dark:text-rose-100 focus-visible:bg-rose-100 focus-visible:text-rose-900 outline-none">
          <Trash2Icon size={17} strokeWidth={1.5} />
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post
            and remove {"it's"} data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            disabled={isLoading}
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
