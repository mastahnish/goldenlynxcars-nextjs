'use client';

import { FaMinus, FaPlus } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import { Accordion } from '@/components/ui/accordion/accordion';
import { useAccordionItemContext } from '@/components/ui/accordion/accordion-item/accordion-item.context';

type FAQSectionAccordionTitleProps = Readonly<{
	i: number;
	question: string;
}>;

export const FAQSectionAccordionTitle = ({
	i,
	question,
}: FAQSectionAccordionTitleProps) => {
	const { isExpanded } = useAccordionItemContext();

	const Icon = isExpanded ? FaMinus : FaPlus;

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
