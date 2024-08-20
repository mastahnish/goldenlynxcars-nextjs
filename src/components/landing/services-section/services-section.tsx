import { getServicesSectionContent } from './services-section.content';
import { ServicesSectionAccordion } from './services-section-accordion/services-section-accordion';

import { Section } from '@/components/common/section';

export const ServicesSection = async () => {
	const { title, label, services } = await getServicesSectionContent();

	return (
		<Section id="services" title={title} label={label}>
			<ServicesSectionAccordion services={services} />
		</Section>
	);
};
