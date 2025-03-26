import { CarSubscriptionBenefitsList } from './car-subscription-benefits-list';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionBenefits = async () => {
	const { benefits } = await getCachedGlobal('car-subscription-content')();

	return (
		<Section title={benefits.title} label={benefits.label}>
			<CarSubscriptionBenefitsList />
		</Section>
	);
};
