import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getServicesSectionContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const servicesSection = await payload.findGlobal({
			slug: 'services-section',
		});

		return servicesSection;
	},
	[],
	{
		tags: ['global_services_section'],
	},
);
