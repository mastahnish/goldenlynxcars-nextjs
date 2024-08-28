import { ReelSection } from './reel-section/reel-section';
import { getServicesSectionContent } from './services-section.content';
import { ServicesSectionAccordion } from './services-section-accordion/services-section-accordion';

import { Media } from '@/components/common/media/media';
import { Section } from '@/components/common/section';

export const ServicesSection = async () => {
	const { title, label, reelSection, services } =
		await getServicesSectionContent();

	return (
		<>
			<Section id="services" title={title} label={label}>
				<div className="flex gap-24">
					<ServicesSectionAccordion services={services} />
					{!reelSection.isHidden && (
						<Media
							resource={reelSection.video}
							width={300}
							height={533}
							className="hidden self-start rounded-lg lg:block"
						/>
					)}
				</div>
			</Section>
			{!reelSection.isHidden && <ReelSection {...reelSection} />}
		</>
	);
};
