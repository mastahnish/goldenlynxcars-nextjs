import { ReelSection } from './reel-section/reel-section';
import { ServicesSectionAccordion } from './services-section-accordion/services-section-accordion';
import { ServicesSectionVideo } from './services-section-video';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const ServicesSection = async () => {
	const { title, label, reelSection, services } =
		await getCachedGlobal('services-section')();

	return (
		<>
			<Section id="services" title={title} label={label}>
				<div className="flex gap-24">
					<ServicesSectionAccordion services={services} />
					{!reelSection.isHidden && (
						<ServicesSectionVideo video={reelSection.video} />
					)}
				</div>
			</Section>
			{!reelSection.isHidden && <ReelSection {...reelSection} />}
		</>
	);
};
