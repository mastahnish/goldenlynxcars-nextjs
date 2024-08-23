import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getCarFleetSectionContent = unstable_cache(
	async () => {
		const payload = await getPayloadHMR({ config });
		const carFleetSection = await payload.findGlobal({
			slug: 'car-fleet-section',
		});

		return carFleetSection;
	},
	[],
	{
		tags: ['collection_car_fleet', 'global_car_fleet_section'],
	},
);
