'use client';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePickerField } from './date-picker-form-field';
import { onSubmit } from './on-submit';
import { createTripFormSchema, isValidImageFile } from './schema';

type RegisterFormProps = React.HTMLAttributes<HTMLDivElement> & {
  setError: SetStateActionType<string>;
};

export function CreateTripForm({
  className,
  setError,
  ...props
}: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  const form = useForm<createTripFormSchema>({
    resolver: zodResolver(createTripFormSchema),
  });

  useEffect(() => {
    return () => {
      objectUrls.forEach(URL.revokeObjectURL);
    };
  }, [objectUrls]);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
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
                <FormDescription>The destination of the trip.</FormDescription>
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
                    placeholder="A 3 days trip to UAE. Will be traveling through some exotic places."
                    minLength={40}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Description must be in between 40-200 characters.
                </FormDescription>
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
                  Select the start and end date of the trip.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpg, .jpeg, .png, .svg, .webp"
                    onChange={(e) => {
                      const filesArray = Object.values(e.target.files || {});

                      field.onChange(filesArray);

                      const isValid = isValidImageFile(filesArray);

                      if (isValid) {
                        const urls = filesArray.map(URL.createObjectURL);

                        setObjectUrls(urls);
                      } else {
                        setObjectUrls([]);
                      }
                    }}
                    multiple
                    className="file:dark:text-neutral-400 file:text-neutral-500"
                  />
                </FormControl>
                <FormDescription>
                  Select upto 7 images with 16:9 aspect ratio. Each image size can only be 7MB at maximum.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
            {objectUrls.map((url, index) => (
              <div key={url} className="relative">
                <Button
                  size={'sm'}
                  variant={'outline'}
                  onClick={() => {
                    setObjectUrls((prev) =>
                      prev.filter((item) => item !== url)
                    );

                    const imageFiles = form.getValues('images');

                    const filteredFiles = imageFiles.filter(
                      (_, i) => i !== index
                    );

                    form.setValue('images', filteredFiles);
                  }}
                  className="size-7 absolute top-2 right-2 shadow-md"
                >
                  <span className="sr-only">Unselect image</span>
                  <X className="size-4 shrink-0" />
                </Button>

                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    className="object-cover rounded-md size-auto shadow border"
                    alt="Something went wrong! Please refresh the page and try again."
                  />
                }
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-center sm:justify-end items-center gap-4">
            <Link
              href={'/dashboard/trips'}
              aria-disabled={isLoading}
              className={buttonVariants({ variant: 'secondary' })}
            >
              Cancel and go back
            </Link>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
