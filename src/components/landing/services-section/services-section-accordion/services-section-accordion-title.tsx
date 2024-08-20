import { Accordion } from '@/components/ui/accordion/accordion';

import type { Service } from '../services-section.types';

type ServicesSectionAccordionTitleProps = Readonly<{
	service: Service;
}>;

export const ServicesSectionAccordionTitle = ({
	service,
}: ServicesSectionAccordionTitleProps) => (
	<Accordion.Title>
		{service.title}
		{service.isNew && (
			<span className="ml-2 font-normal text-secondary">(nowość!)</span>
		)}
	</Accordion.Title>
);
