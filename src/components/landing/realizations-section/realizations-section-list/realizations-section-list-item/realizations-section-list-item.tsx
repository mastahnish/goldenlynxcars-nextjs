import { RealizationsSectionListItemDetails } from './realizations-section-list-item-details';
import { RealizationsSectionListItemVideo } from './realizations-section-list-item-video';

import type { Realization } from '../../realizations-section.types';

type RealizationsSectionListItemProps = Readonly<{
	realization: Realization;
}>;

export const RealizationsSectionListItem = ({
	realization,
}: RealizationsSectionListItemProps) => (
	<article className="mx-auto flex w-full flex-col sm:max-w-realization-card sm:flex-row">
		<RealizationsSectionListItemVideo video={realization.video} />
		<RealizationsSectionListItemDetails realization={realization} />
	</article>
);
