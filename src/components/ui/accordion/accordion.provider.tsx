'use client';

import { useState } from 'react';

import { createSafeContext } from '@/lib/create-safe-context';

import type { ItemValue } from './accordion.types';
import type { ReactNode } from 'react';

interface AccordionContextValue {
	expandedElement: ItemValue | null;
	changeExpandedElement: (value: ItemValue) => void;
}

const [useAccordionContext, AccordionContextProvider] =
	createSafeContext<AccordionContextValue>();

type AccordionProviderProps = Readonly<{
	children: ReactNode;
}>;

const AccordionProvider = ({ children }: AccordionProviderProps) => {
	const [expandedElement, setExpandedElement] = useState<ItemValue | null>(
		null,
	);

	const changeExpandedElement = (value: ItemValue) =>
		setExpandedElement(value !== expandedElement ? value : null);

	return (
		<AccordionContextProvider
			value={{ expandedElement, changeExpandedElement }}
		>
			{children}
		</AccordionContextProvider>
	);
};

export { AccordionProvider, useAccordionContext };
