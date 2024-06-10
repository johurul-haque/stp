'use client';

import { resetPassword } from '@/actions/auth';
import { AlertDestructive } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordField } from './password-field';
import { changePasswordForm } from './schema';

export function ChangePasswordModal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const form = useForm<changePasswordForm>({
    resolver: zodResolver(changePasswordForm),
  });

  const onSubmit = async ({
    new_password,
    current_password,
  }: changePasswordForm) => {
    setIsLoading(true);

    try {
      await resetPassword({ current_password, new_password });

      toast({
        title: 'Success 🎉',
        description: 'Password successfully changed',
      });
    } catch (error) {
      setError((error as Error).message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <D.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <D.DialogTrigger asChild>{children}</D.DialogTrigger>

      <D.DialogContent>
        <D.DialogHeader>
          <D.DialogTitle>Change your password</D.DialogTitle>
          <D.DialogDescription>
            Fill in the required fields. Click confirm when you are done.
          </D.DialogDescription>
        </D.DialogHeader>

        {error && <AlertDestructive message={error} />}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
            <PasswordField
              form={form}
              label="Current password"
              name="current_password"
              isLoading={isLoading}
            />

            <PasswordField
              form={form}
              label="New password"
              name="new_password"
              isLoading={isLoading}
            />

            <PasswordField
              form={form}
              label="Confirm new password"
              name="confirm_new_password"
              isLoading={isLoading}
            />

            <D.DialogFooter className="mt-3 ring">
              <Button
                variant={'secondary'}
                type="button"
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={'destructive'}
                disabled={isLoading}
              >
                Confirm
              </Button>
            </D.DialogFooter>
          </form>
        </Form>
      </D.DialogContent>
    </D.Dialog>
  );
}
