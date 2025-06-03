import { ReelSection } from './reel-section/reel-section';
import { ServicesSectionAccordion } from './services-section-accordion/services-section-accordion';
import { ServicesSectionVideo } from './services-section-video';

import { Container } from '@/components/common/container';
import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const ServicesSection = async () => {
	const { title, label, reelSection, services } =
		await getCachedGlobal('services-section')();

	return (
		<>
			{!reelSection.isHidden && (
				<Container>
					<ServicesSectionVideo video={reelSection.video} />
				</Container>
			)}
			<Section id="services" title={title} label={label}>
				<ServicesSectionAccordion services={services} />
			</Section>
			{!reelSection.isHidden && <ReelSection {...reelSection} />}
		</>
	);
};
