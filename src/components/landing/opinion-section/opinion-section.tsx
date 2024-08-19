import { getOpinionSectionContent } from './opinion-section.content';
import { OpinionSectionList } from './opinion-section-list/opinion-section-list';

import { Section } from '@/components/common/section';

export const OpinionSection = async () => {
	const { title, label, opinions } = await getOpinionSectionContent();

	return (
		<Section title={title} label={label}>
			<OpinionSectionList opinions={opinions} />
		</Section>
	);
};
