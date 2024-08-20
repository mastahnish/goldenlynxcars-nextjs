import { getFAQSectionContent } from './faq-section.content';
import { FAQSectionAccordion } from './faq-section-accordion/faq-section-accordion';
import { FAQSectionImages } from './faq-section-images';

import { Section } from '@/components/common/section';

export const FAQSection = async () => {
	const { title, label, faqs, images } = await getFAQSectionContent();

	const medias = images
		.map(({ image }) => image)
		.filter(media => typeof media !== 'number');

	return (
		<Section title={title} label={label}>
			<div className="flex w-full gap-12 max-lg:flex-col max-lg:items-center">
				<FAQSectionAccordion faqs={faqs} />
				<FAQSectionImages firstImage={medias[0]} secondImage={medias[1]} />
			</div>
		</Section>
	);
};
