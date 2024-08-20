import { twMerge } from 'tailwind-merge';

import { AccordionProvider } from './accordion.provider';
import { AccordionContent } from './accordion-content';
import { AccordionItem } from './accordion-item/accordion-item';
import { AccordionTitle } from './accordion-title';

import type { ReactNode } from 'react';

type AccordionProps = Readonly<{
	fullWidth?: boolean;
	children: ReactNode;
}>;

export const Accordion = ({ fullWidth, children }: AccordionProps) => (
	<AccordionProvider>
		<ul className={twMerge(fullWidth && 'w-full')}>{children}</ul>
	</AccordionProvider>
);

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
