'use client';

import { pl } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

import { ChevronLeft, ChevronRight } from './icons';

import type { ComponentProps } from 'react';

type CalendarProps = ComponentProps<typeof DayPicker>;

export const Calendar = ({
	className,
	classNames,
	showOutsideDays = true,
	locale = pl,
	...props
}: CalendarProps) => (
	<DayPicker
		showOutsideDays={showOutsideDays}
		locale={locale}
		className={twMerge('p-3', className)}
		classNames={{
			months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
			month: 'space-y-4',
			caption: 'flex justify-center pt-1 relative items-center text-white',
			caption_label: 'text-sm font-semibold',
			nav: 'space-x-1 flex items-center',
			nav_button:
				'inline-flex items-center justify-center size-7 rounded-md transition-colors outline-none border hover:bg-white/10 hover:text-neutral-200 opacity-50 hover:opacity-100',
			nav_button_previous: 'absolute left-1',
			nav_button_next: 'absolute right-1',
			table: 'w-full border-collapse space-y-1',
			head_row: 'flex',
			head_cell: 'text-gray-300 rounded-md w-9 font-normal text-[0.8rem]',
			row: 'flex w-full mt-2',
			cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
			day: 'inline-flex size-9 items-center justify-center rounded-md text-sm hover:bg-white/10',
			day_range_end: 'day-range-end',
			day_selected:
				'bg-white text-semi-black hover:bg-white hover:text-semi-black',
			day_outside:
				'day-outside text-gray-300 hover:text-white opacity-60 aria-selected:bg-neutral-700 aria-selected:text-white aria-selected:opacity-30',
			day_disabled: 'text-gray-300 opacity-50',
			day_hidden: 'invisible',
			...classNames,
		}}
		components={{
			IconLeft: () => <ChevronLeft size={16} />,
			IconRight: () => <ChevronRight size={16} />,
		}}
		{...props}
	/>
);
