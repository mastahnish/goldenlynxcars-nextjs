import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getFAQSectionContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const faqSection = await payload.findGlobal({
			slug: 'faq-section',
		});

		return faqSection;
	},
	[],
	{
		tags: ['global_faq_section'],
	},
);
