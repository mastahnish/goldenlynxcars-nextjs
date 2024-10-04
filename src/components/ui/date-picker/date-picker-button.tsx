import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

import { OutlineCalendarMonth } from '../icons';

type DatePickerButtonProps = Readonly<{
	label: string;
	isError?: boolean;
	fullWidth?: boolean;
	date?: Date;
}>;

export const DatePickerButton = ({
	label,
	isError,
	fullWidth,
	date,
	...props
}: DatePickerButtonProps) => (
	<button
		type="button"
		className={twMerge(
			'flex h-14 w-64 items-center justify-between rounded-lg bg-form-field px-5',
			isError && 'bg-red-500/60',
			fullWidth && 'w-full',
		)}
		{...props}
	>
		<div className="text-left">
			<p className="text-sm text-neutral-400">{label}</p>
			<p className="text-gray-300">
				{date ? format(date, 'PPP', { locale: pl }) : 'Wybierz date'}
			</p>
		</div>
		<OutlineCalendarMonth
			size={24}
			className={!isError ? 'text-gray-300' : 'text-white'}
		/>
	</button>
);
