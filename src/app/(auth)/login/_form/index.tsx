import { Eye, EyeClosed } from '@/components/icons';
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
import { cn } from '@/lib/utils';
import { SetStateActionType } from '@/types/set-state-action';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { onSubmit } from './on-submit';
import { loginSchema } from './schema';

type LoginFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setError: SetStateActionType<string | undefined>;
};

export function LoginForm({ className, setError }: LoginFormProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className={cn('grid gap-6', className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            onSubmit({ values, setIsLoading, setError })
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
                <FormControl>
                  <div className="relative">
                    <Input
                      className="transition-all"
                      type={isShowing ? 'text' : 'password'}
                      placeholder="****"
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setIsShowing(!isShowing)}
                      className="absolute translate-y-1/2 bottom-1/2 right-3"
                    >
                      <span className="sr-only">
                        {isShowing ? 'Hide' : 'Show'} password
                      </span>
                      {isShowing ? <EyeClosed /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full mt-3">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
