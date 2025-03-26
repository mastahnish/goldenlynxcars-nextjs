import { CarSubscriptionComparisonTable } from './car-subscription-comparison-table';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionComparison = async () => {
	const { comparisonTable } = await getCachedGlobal(
		'car-subscription-content',
	)();

	return (
		<Section title={comparisonTable.title} label={comparisonTable.label}>
			<CarSubscriptionComparisonTable />
		</Section>
	);
};
