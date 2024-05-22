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
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from './schema';

type LoginFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setError: SetStateActionType<string | undefined>;
};

export function LoginForm({ className, setError }: LoginFormProps) {
  const [isShowing, setIsShowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const login = async (values: loginSchema) => {
    setIsLoading(true);

    const payload = {
      password: values.password,
      email: undefined,
      username: undefined,
    };

    const { success } = z.string().email().safeParse(values.handle);

    if (success) {
      payload.email = values.handle as any;
    } else {
      payload.username = values.handle as any;
    }

    try {
      const res = await axios.post('/api/login', payload);

      console.log(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('grid gap-6', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)} className="grid gap-3">
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
