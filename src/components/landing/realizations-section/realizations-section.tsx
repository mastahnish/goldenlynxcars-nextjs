import { RealizationsSectionList } from './realizations-section-list/realizations-section-list';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const RealizationsSection = async () => {
	const { title, label, realizations } = await getCachedGlobal(
		'realizations-section',
	)();

	return (
		<Section title={title} label={label}>
			<RealizationsSectionList realizations={realizations} />
		</Section>
	);
};
