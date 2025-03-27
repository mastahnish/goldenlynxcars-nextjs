import { LongTermRentalAdditionalInformationList } from './long-term-rental-additional-information-list';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const LongTermRentalAdditionalInformation = async () => {
	const { additionalInformation } = await getCachedGlobal(
		'long-term-rental-content',
	)();

	return (
		<Section
			title={additionalInformation.title}
			label={additionalInformation.label}
		>
			<LongTermRentalAdditionalInformationList />
		</Section>
	);
};
