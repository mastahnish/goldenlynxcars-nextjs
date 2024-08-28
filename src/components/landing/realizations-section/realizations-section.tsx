import { getRealizationsSectionContent } from './realizations-section.content';
import { RealizationsSectionList } from './realizations-section-list/realizations-section-list';

import { Section } from '@/components/common/section';

export const RealizationsSection = async () => {
	const { title, label, realizations } = await getRealizationsSectionContent();

	return (
		<Section title={title} label={label}>
			<RealizationsSectionList realizations={realizations} />
		</Section>
	);
};
