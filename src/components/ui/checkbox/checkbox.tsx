/* eslint-disable tailwindcss/no-arbitrary-value */

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { useId } from 'react';

import { Check } from '@/components/ui/icons';

type CheckboxProps = Readonly<{
	label: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}>;

export const Checkbox = ({
	label,
	checked,
	onCheckedChange,
	...props
}: CheckboxProps) => {
	const id = useId();

	return (
		<div className="flex w-fit cursor-pointer items-center">
			<CheckboxPrimitive.Root
				id={id}
				checked={checked}
				onCheckedChange={onCheckedChange}
				className="flex size-6 shrink-0 appearance-none items-center justify-center rounded border data-[state=checked]:border-primary data-[state=unchecked]:border-white data-[state=checked]:bg-primary"
				{...props}
			>
				<CheckboxPrimitive.Indicator className="text-white">
					<Check />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			<label
				htmlFor={id}
				className="ml-2.5 cursor-[inherit] select-none text-neutral-300"
			>
				{label}
			</label>
		</div>
	);
};
