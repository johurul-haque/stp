'use client';

import { AlertDestructive } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { onSubmit } from './on-submit';
import { PasswordField } from './password-field';
import { registerSchema } from './schema';

export function RegisterForm({ redirectFrom }: { redirectFrom?: string }) {
  const [error, setError] = useState<string | undefined>('');

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <>
      {error && <AlertDestructive message={error} />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit({ values, setIsLoading, setError, redirectFrom })
          )}
          className="grid gap-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="transition-all"
                    placeholder="johurul"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <PasswordField
            form={form}
            name={'password'}
            label="Password"
            isLoading={isLoading}
          />

          <PasswordField
            form={form}
            name={'confirm_password'}
            label="Confirm password"
            isLoading={isLoading}
          />

          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
