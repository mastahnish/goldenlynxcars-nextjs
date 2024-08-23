import { DatePickerButton } from './date-picker-button';

import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = Readonly<{
	value: Date | undefined;
	isError?: boolean;
	fullWidth?: boolean;
	fromDate?: Date;
	onSelect: (date: Date | undefined) => void;
}>;

export const DatePicker = ({
	value,
	isError,
	fullWidth,
	onSelect,
	...props
}: DatePickerProps) => (
	<Popover>
		<PopoverTrigger asChild>
			<DatePickerButton isError={isError} fullWidth={fullWidth} date={value} />
		</PopoverTrigger>
		<PopoverContent className="w-auto p-0">
			<Calendar
				mode="single"
				selected={value}
				onSelect={onSelect}
				initialFocus
				{...props}
			/>
		</PopoverContent>
	</Popover>
);
