import { FAQSectionAccordionTitle } from './faq-section-accordion-title';

import { Accordion } from '@/components/ui/accordion/accordion';

import type { FAQ } from '../faq-section.types';

type FAQSectionAccordionProps = Readonly<{
	faqs: FAQ[];
}>;

export const FAQSectionAccordion = ({ faqs }: FAQSectionAccordionProps) => (
	<Accordion fullWidth>
		{faqs.map((faq, i) => (
			<Accordion.Item key={i} value={i}>
				<FAQSectionAccordionTitle i={i} question={faq.question} />
				<Accordion.Content>{faq.answer}</Accordion.Content>
			</Accordion.Item>
		))}
	</Accordion>
);
