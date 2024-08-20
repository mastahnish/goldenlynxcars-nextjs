'use client';

import { twMerge } from 'tailwind-merge';

import { useAccordionContext } from '../accordion.provider';
import { AccordionItemContextProvider } from './accordion-item.context';

import type { ItemValue } from '../accordion.types';
import type { ReactNode } from 'react';

type AccordionItemProps = Readonly<{
	value: ItemValue;
	children: ReactNode;
}>;

export const AccordionItem = ({ value, children }: AccordionItemProps) => {
	const { expandedElement } = useAccordionContext();

	const isExpanded = expandedElement === value;

	return (
		<AccordionItemContextProvider value={{ value, isExpanded }}>
			<div
				className={twMerge('p-px rounded-2xl', isExpanded && 'bg-service-item')}
			>
				<div className="overflow-hidden rounded-2xl bg-background px-6 text-white md:px-10">
					{children}
				</div>
			</div>
		</AccordionItemContextProvider>
	);
};
