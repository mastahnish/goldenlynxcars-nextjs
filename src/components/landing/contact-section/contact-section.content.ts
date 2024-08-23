import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getContactSectionContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const contactSection = await payload.findGlobal({
			slug: 'contact-section',
		});
		const carFleet = await payload.find({
			collection: 'car-fleet',
		});

		return { ...contactSection, carFleet };
	},
	[],
	{
		tags: ['collection_car_fleet', 'global_contact_section'],
	},
);
