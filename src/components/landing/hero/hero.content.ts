import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getHeroContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const hero = await payload.findGlobal({
			slug: 'hero',
		});

		return { title: hero.title, description: hero.description };
	},
	[],
	{
		tags: ['global_hero'],
	},
);
