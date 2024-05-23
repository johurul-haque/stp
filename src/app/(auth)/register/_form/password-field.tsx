import { Eye, EyeClosed } from '@/components/icons';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { registerSchema } from './schema';

export function PasswordField({
  form,
  name,
  index,
  isLoading,
}: {
  form: UseFormReturn<registerSchema, any, undefined>;
  name: 'password' | 'confirm_password';
  index: number;
  isLoading: boolean;
}) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{index > 0 && 'Confirm'} Password</FormLabel>
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
              onClick={() => setIsShowing(!isShowing)}
              className="absolute translate-y-1/2 bottom-1/2 right-3"
            >
              <span className="sr-only">
                {isShowing ? 'Hide' : 'Show'} password
              </span>
              {isShowing ? <EyeClosed /> : <Eye />}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
