import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getOpinionSectionContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const opinionSection = await payload.findGlobal({
			slug: 'opinion-section',
		});

		return opinionSection;
	},
	[],
	{
		tags: ['global_opinion_section'],
	},
);
