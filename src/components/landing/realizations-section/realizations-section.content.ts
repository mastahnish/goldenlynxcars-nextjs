import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getRealizationsSectionContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const realizationsSection = await payload.findGlobal({
			slug: 'realizations-section',
		});

		return realizationsSection;
	},
	[],
	{
		tags: ['global_realizations_section'],
	},
);
