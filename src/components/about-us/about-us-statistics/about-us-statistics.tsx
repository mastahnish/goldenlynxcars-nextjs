import { AboutUsStatisticsList } from './about-us-statistics-list/about-us-statistics-list';

import { Section } from '@/components/common/section';

import { getCachedCollection } from '@/lib/get-cached-collection';
import { getCachedGlobal } from '@/lib/get-cached-global';

export const AboutUsStatistics = async () => {
	const { title, label, statistics } = await getCachedGlobal(
		'about-us-statistics',
	)();
	const carFleet = await getCachedCollection('car-fleet', { limit: 100 })();

	return (
		<Section title={title} label={label}>
			<AboutUsStatisticsList
				clients={statistics.clients}
				cars={carFleet.docs.length}
				kilometers={statistics.kilometers}
			/>
		</Section>
	);
};
