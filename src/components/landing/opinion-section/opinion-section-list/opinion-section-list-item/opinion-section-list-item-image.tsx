import { Media } from '@/components/common/media';

import type { ComponentProps } from 'react';

type OpinionSectionListItemImageProps = Readonly<{
	resource: ComponentProps<typeof Media>['resource'];
}>;

export const OpinionSectionListItemImage = ({
	resource,
}: OpinionSectionListItemImageProps) => (
	<div className="absolute left-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary">
		<Media resource={resource} fill className="rounded-full object-cover" />
		<div
			role="presentation"
			className="absolute bottom-0 left-1/2 flex size-10 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border border-primary bg-semi-black"
		>
			<span aria-hidden className="mt-6 text-5xl text-white">
				“
			</span>
		</div>
	</div>
);
