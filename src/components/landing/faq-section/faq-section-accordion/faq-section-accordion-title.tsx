'use client';

import { twMerge } from 'tailwind-merge';

import { Accordion } from '@/components/ui/accordion/accordion';
import { useAccordionItemContext } from '@/components/ui/accordion/accordion-item/accordion-item.context';
import { Minus, Plus } from '@/components/ui/icons';

type FAQSectionAccordionTitleProps = Readonly<{
	i: number;
	question: string;
}>;

export const FAQSectionAccordionTitle = ({
	i,
	question,
}: FAQSectionAccordionTitleProps) => {
	const { isExpanded } = useAccordionItemContext();

	const Icon = isExpanded ? Minus : Plus;

	return (
		<Accordion.Title>
			{i + 1}. {question}
			<Icon
				size={22}
				className={twMerge('ml-auto', isExpanded && 'text-primary')}
			/>
		</Accordion.Title>
	);
};
