import { OpinionSectionListItemImage } from './opinion-section-list-item-image';

import type { Opinion } from '../../opinion-section.types';

type OpinionSectionListItemProps = Readonly<{
	opinion: Opinion;
}>;

export const OpinionSectionListItem = ({
	opinion,
}: OpinionSectionListItemProps) => (
	<article className="relative mx-auto mt-opinion-item flex h-opinion-item w-full max-w-sm flex-col rounded-2xl border border-primary/10 bg-semi-black px-5">
		<OpinionSectionListItemImage resource={opinion.image} />
		<p className="mt-20 flex h-full items-center justify-center text-neutral-300">
			{opinion.content}
		</p>
		<p className="border-t border-primary/10 py-4 text-center text-lg font-semibold text-primary">
			{opinion.fullName}
		</p>
	</article>
);
