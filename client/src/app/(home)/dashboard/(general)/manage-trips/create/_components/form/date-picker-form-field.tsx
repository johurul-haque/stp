import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ControllerRenderProps } from 'react-hook-form';
import { createTripFormSchema } from './schema';

type Props = {
  field: ControllerRenderProps<createTripFormSchema, 'date'>;
  disabled: boolean;
};

export function DatePickerField({ field, disabled }: Props) {
  const fromYear = new Date().getFullYear();
  const toYear = fromYear + 1;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            disabled={disabled}
            className={cn('justify-start text-left font-normal w-full', {
              'dark:text-neutral-400 text-neutral-600/90':
                !field.value?.from && !field.value?.to,
            })}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value?.from ? (
              field.value?.to ? (
                <>
                  {format(field.value.from, 'LLL dd, y')} -{' '}
                  {format(field.value.to, 'LLL dd, y')}
                </>
              ) : (
                format(field.value.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick start and end date</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="range"
          numberOfMonths={2}
          captionLayout="dropdown-buttons"
          fromYear={fromYear}
          toYear={toYear}
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() - 1);

            if (date < newDate) return true;

            newDate.setFullYear(toYear);
            return date > newDate;
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
