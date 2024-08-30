import { OpinionSectionList } from './opinion-section-list/opinion-section-list';

import { Section } from '@/components/common/section';

import { getCachedGlobal } from '@/lib/get-cached-global';

export const OpinionSection = async () => {
	const { title, label, opinions } = await getCachedGlobal('opinion-section')();

	return (
		<Section title={title} label={label}>
			<OpinionSectionList opinions={opinions} />
		</Section>
	);
};
