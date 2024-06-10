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
import { loginSchema } from './schema';

export function LoginForm({ redirectFrom }: { redirectFrom?: string }) {
  const [error, setError] = useState<string>();

  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
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
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    type="text"
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="transition-all"
                      type={isShowing ? 'text' : 'password'}
                      placeholder="****"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    title={isShowing ? 'Hide password' : 'Show password'}
                    onClick={() => setIsShowing(!isShowing)}
                    disabled={isLoading}
                    className="absolute translate-y-1/2 bottom-1/2 right-3 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span className="sr-only">
                      {isShowing ? 'Hide' : 'Show'} password
                    </span>
                    {isShowing ? '👀' : '🫣'}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
}
