import * as SelectPrimitive from '@radix-ui/react-select';
import { forwardRef } from 'react';

import { Check } from '../icons';

import type { ReactNode } from 'react';

type SelectItemProps = Readonly<{
	value: string;
	children: ReactNode;
}>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
	({ children, ...props }, ref) => (
		<SelectPrimitive.Item
			ref={ref}
			className="relative flex h-8 cursor-pointer select-none items-center rounded-sm pl-7 pr-9 leading-none text-white data-[highlighted]:bg-neutral-700 data-[highlighted]:outline-none"
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
				<Check />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	),
);

SelectItem.displayName = 'SelectItem';