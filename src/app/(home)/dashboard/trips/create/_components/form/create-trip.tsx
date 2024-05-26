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
import { Input, inputBaseStyles } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SetStateActionType } from '@/types/set-state-action';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePickerField } from './date-picker-form-field';
import { createTripFormSchema } from './schema';

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setError: SetStateActionType<string>;
};

export function CreateTripForm({
  className,
  setError,
  ...props
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<createTripFormSchema>({
    resolver: zodResolver(createTripFormSchema),
  });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            console.log(values);
          })}
          className="grid gap-5"
        >
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input
                    className="transition-all"
                    placeholder="UAE"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide the destination where you want to travel.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travel_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel type</FormLabel>
                <FormControl>
                  <Input placeholder="Adventure" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className={cn(inputBaseStyles(), 'h-32')}
                    placeholder="A trip to UAE, habibi come to Dubai"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Travel Date</FormLabel>
                <DatePickerField field={field} />
                <FormDescription>
                  Pick the range from the day the trip starts and the day it is
                  expected to end.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg, .jpeg, .png, .svg, .webp"
                    onChange={(e) => {
                      field.onChange(e.target.files || null);
                    }}
                    multiple
                    className="file:dark:text-neutral-400 file:text-neutral-500"
                  />
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
