'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateProfile } from '@/actions/update-profile';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types/user';
import { useState } from 'react';
import { profileFormSchema } from './schema';

type AccountFormProps = { user?: User };

export function AccountForm({ user }: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<profileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: user?.email,
      username: user?.username,
    },
  });

  const onSubmit = async (data: profileFormSchema) => {
    setIsLoading(true);

    if (data.email === user?.email && data.username === user?.username) {
      setIsLoading(false);

      return toast({
        title: 'Up to date',
        description: 'Nothing to update.',
      });
    }

    try {
      await updateProfile(data);

      toast({
        title: 'Success 🎉',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Uh oh!',
        description: (error as Error)?.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormDescription>
                This needs to be your verified email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
