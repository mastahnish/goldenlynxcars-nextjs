import { getServicesSectionContent } from './services-section.content';
import { ServicesSectionList } from './services-section-list/services-section-list';

import { Section } from '@/components/common/section';

export const ServicesSection = async () => {
	const { title, label, services } = await getServicesSectionContent();

	return (
		<Section id="services" title={title} label={label ?? null}>
			<ServicesSectionList services={services} />
		</Section>
	);
};
