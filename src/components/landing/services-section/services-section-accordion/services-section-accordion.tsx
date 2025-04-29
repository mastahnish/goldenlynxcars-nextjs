import { ServicesSectionAccordionContent } from './services-section-accordion-content';
import { ServicesSectionAccordionTitle } from './services-section-accordion-title';

import { Accordion } from '@/components/ui/accordion/accordion';

import type { Service } from '../services-section.types';

type ServicesSectionAccordionProps = Readonly<{
	services: Service[];
}>;

export const ServicesSectionAccordion = ({
	services,
}: ServicesSectionAccordionProps) => (
	<Accordion fullWidth>
		{services.map((service, i) => (
			<Accordion.Item key={i} value={i}>
				<ServicesSectionAccordionTitle service={service} />
				<ServicesSectionAccordionContent service={service} />
			</Accordion.Item>
		))}
	</Accordion>
);
