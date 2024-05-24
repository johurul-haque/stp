'use client';

import { AlertDestructive } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import * as D from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PasswordField } from './password-field';
import { changePasswordForm } from './schema';

export function ChangePasswordModal({ children }: { children: ReactNode }) {
  const [isShowing, setIsShowing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const form = useForm<changePasswordForm>({
    resolver: zodResolver(changePasswordForm),
  });

  const onSubmit = async (values: changePasswordForm) => {
    console.log(values);
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

            {error && <AlertDestructive message={error} />}

            <D.DialogFooter className="mt-3">
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
