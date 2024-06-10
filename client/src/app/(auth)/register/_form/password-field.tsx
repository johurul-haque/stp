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
  isLoading,
  label,
}: {
  form: UseFormReturn<registerSchema, any, undefined>;
  name: 'password' | 'confirm_password';
  isLoading: boolean;
  label: string;
}) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
              disabled={isLoading}
              onClick={() => setIsShowing(!isShowing)}
              className="absolute translate-y-1/2 bottom-1/2 right-3 disabled:opacity-60 disabled:pointer-events-none"
            >
              <span className="sr-only">
                {isShowing ? 'Hide' : 'Show'} password
              </span>
              {isShowing ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
