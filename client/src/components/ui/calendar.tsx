"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker, useDayPicker, useNavigation } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format, setMonth } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'hidden',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-neutral-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-neutral-400',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected])]:bg-neutral-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50 dark:[&:has([aria-selected])]:bg-neutral-800',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-neutral-900 text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900',
        day_today:
          'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
        day_outside:
          'day-outside text-neutral-500 opacity-50 aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400',
        day_disabled: 'text-neutral-500 opacity-50 dark:text-neutral-400',
        day_range_middle:
          'aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50',
        day_hidden: 'invisible',
        caption_dropdowns: 'flex gap-1.5',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Dropdown: (props) => {
          const { fromYear, toYear } = useDayPicker();

          if (props.name === 'months') {
            return <SelectMonth value={props?.value?.toString()} />;
          }

          if (fromYear && toYear && props.name === 'years') {
            return (
              <SelectYear
                fromYear={fromYear}
                toYear={toYear}
                value={props.value?.toString()}
              />
            );
          }

          return null;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

function SelectYear({
  fromYear,
  toYear,
  value,
}: {
  fromYear: number;
  toYear: number;
  value?: string;
}) {
  const { goToMonth, currentMonth } = useNavigation();

  let selectItems = [] as string[];

  selectItems = Array.from(
    { length: toYear - fromYear + 1 },
    (_, i) => `${fromYear + i}`
  );

  return (
    <Select
      onValueChange={(newValue) => {
        const newDate = new Date(currentMonth);
        newDate.setFullYear(Number(newValue));

        goToMonth(newDate);
      }}
      value={value}
    >
      <SelectTrigger className="h-8 gap-x-2.5">
        <SelectValue placeholder={currentMonth.getFullYear()} />
      </SelectTrigger>
      <SelectContent>
        {selectItems.map((selectItem) => (
          <SelectItem key={selectItem} value={selectItem}>
            {selectItem}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SelectMonth({ value }: { value?: string }) {
  const { currentMonth, goToMonth } = useNavigation();

  const selectItems = Array.from({ length: 12 }, (_: unknown, index: number) =>
    format(setMonth(new Date(), index), 'MMM')
  );

  const getSelectedMonth = () => {
    const newDate = new Date();
    newDate.setMonth(Number(value));
    return newDate;
  };

  return (
    <Select
      onValueChange={(newValue) => {
        const newDate = new Date(currentMonth);

        newDate.setMonth(selectItems.findIndex((item) => item === newValue));

        goToMonth(newDate);
      }}
      value={selectItems[Number(value)]}
    >
      <SelectTrigger className="h-8 gap-x-2.5">
        <SelectValue placeholder={format(getSelectedMonth(), 'MMM')} />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {selectItems.map((selectItem) => (
          <SelectItem key={selectItem} value={selectItem}>
            {selectItem}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
