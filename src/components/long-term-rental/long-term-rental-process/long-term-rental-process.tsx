import { LongTermRentalProcessSteps } from './long-term-rental-process-steps';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const LongTermRentalProcess = async () => {
	const { process } = await getCachedGlobal('long-term-rental-content')();

	return (
		<Section title={process.title} label={process.label}>
			<LongTermRentalProcessSteps />
		</Section>
	);
};
