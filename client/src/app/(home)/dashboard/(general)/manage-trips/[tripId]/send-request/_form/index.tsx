'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input, inputBaseStyles } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { onSubmit } from './on-submit';
import { formSchema } from './schema';

type PropsType = {
  tripId: string;
  user: User;
};

export type RequestStatus = 'submitting';

export function SendRequestForm({ tripId, user }: PropsType) {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>();

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onSubmit({ values, tripId, setRequestStatus });
        })}
        className="grid gap-5"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your username</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="joiningReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What makes you interested in this trip?</FormLabel>
              <FormControl>
                <textarea
                  disabled={!!requestStatus}
                  className={cn(inputBaseStyles(), 'h-32')}
                  placeholder="I wanted to travel to Sundarbon for a while now"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tAndC"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="grid gap-1">
                <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Accept terms and conditions
                </FormLabel>
                <p className="text-sm opacity-70">
                  {"We'll not be selling your data. 🫂"}
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="mt-3 flex justify-center sm:justify-end items-center gap-4">
          <Link
            href={`/trips/${tripId}`}
            aria-disabled={!!requestStatus}
            className={buttonVariants({ variant: 'secondary' })}
          >
            Cancel and go back
          </Link>

          <Button disabled={!!requestStatus} type="submit">
            {requestStatus === 'submitting' && 'Sending...'}

            {!requestStatus && 'Send'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
