'use client';

import { useAccordionContext } from './accordion.provider';
import { useAccordionItemContext } from './accordion-item/accordion-item.context';

import type { ReactNode } from 'react';

type AccordionTitleProps = Readonly<{
	children: ReactNode;
}>;

export const AccordionTitle = ({ children }: AccordionTitleProps) => {
	const { changeExpandedElement } = useAccordionContext();
	const { value, isExpanded } = useAccordionItemContext();

	return (
		<button
			type="button"
			aria-expanded={isExpanded}
			onClick={() => changeExpandedElement(value)}
			className="mt-3 flex h-12 w-full items-center text-left text-xl font-semibold xs:text-2xl"
		>
			{children}
		</button>
	);
};
