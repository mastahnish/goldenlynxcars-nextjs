import { CarSubscriptionChooseReasonsList } from './car-subscription-choose-reasons-list';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const CarSubscriptionChooseReasons = async () => {
	const { chooseReasons } = await getCachedGlobal('car-subscription-content')();

	return (
		<Section title={chooseReasons.title} label={chooseReasons.label}>
			<CarSubscriptionChooseReasonsList />
		</Section>
	);
};
