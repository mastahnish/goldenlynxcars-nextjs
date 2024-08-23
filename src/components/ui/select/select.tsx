import * as SelectPrimitive from '@radix-ui/react-select';
import { twMerge } from 'tailwind-merge';

import { ChevronDown, ChevronUp } from '../icons';
import { SelectItem } from './select-item';

type SelectProps = Readonly<{
	'aria-label': string;
	placeholder: string;
	fullWidth?: boolean;
	isError?: boolean;
	options: { value: string; label: string }[];
	onValueChange?: (value: string) => void;
}>;

export const Select = ({
	'aria-label': ariaLabel,
	placeholder,
	fullWidth,
	isError,
	options,
	onValueChange,
	...props
}: SelectProps) => (
	<SelectPrimitive.Root onValueChange={onValueChange} {...props}>
		<SelectPrimitive.Trigger
			aria-label={ariaLabel}
			className={twMerge(
				'inline-flex h-14 items-center justify-between rounded-lg bg-form-field px-5 leading-none text-neutral-300 outline-none data-[placeholder]:text-form-field-placeholder',
				isError && 'bg-red-500/60 data-[placeholder]:text-white/40',
				fullWidth && 'w-full',
			)}
		>
			<SelectPrimitive.Value placeholder={placeholder} />
			<SelectPrimitive.Icon className="text-neutral-300">
				<ChevronDown size={16} />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content className="overflow-hidden rounded-md bg-form-field shadow-select">
				<SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center border-b border-neutral-700 bg-form-field text-white">
					<ChevronUp />
				</SelectPrimitive.ScrollUpButton>
				<SelectPrimitive.Viewport className="p-1">
					{options.map(({ value, label }) => (
						<SelectItem key={value} value={value}>
							{label}
						</SelectItem>
					))}
				</SelectPrimitive.Viewport>
				<SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center border-t border-neutral-700 bg-form-field text-white">
					<ChevronDown />
				</SelectPrimitive.ScrollDownButton>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	</SelectPrimitive.Root>
);
