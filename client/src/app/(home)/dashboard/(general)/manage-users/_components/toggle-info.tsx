'use client';

import { handleInfoChange } from '@/actions/manage-user';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

type PropsType = {
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  userId: string;
};

export function ToggleUserInfo({ role, status, userId }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (payload: Omit<Partial<PropsType>, 'userId'>) => {
    setIsLoading(true);

    try {
      await handleInfoChange(userId, payload);
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      }

      toast({
        title: 'Uh oh! Could not process your request.',
        description: message,
        variant: 'destructive',
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              handleUpdate(payload);
            }}
          >
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3 space-x-2">
      <Button
        onClick={() => {
          const changedRole = role === 'USER' ? 'ADMIN' : 'USER';

          handleUpdate({ role: changedRole });
        }}
        disabled={isLoading}
        variant={'outline'}
        size={'sm'}
        className="h-6 text-xs"
      >
        Make {role === 'USER' ? 'Admin' : 'User'}
      </Button>

      <Button
        onClick={() => {
          const changedStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

          handleUpdate({ status: changedStatus });
        }}
        disabled={isLoading}
        variant={status === 'ACTIVE' ? 'destructive' : 'outline'}
        size={'sm'}
        className="h-6 text-xs"
      >
        {status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
      </Button>
    </div>
  );
}
