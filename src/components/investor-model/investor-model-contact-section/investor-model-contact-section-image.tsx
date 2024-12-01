import { Media } from '@/components/common/media/media';

import type { ComponentProps } from 'react';

type InvestorModelContactSectionImageProps = Readonly<{
	resource: ComponentProps<typeof Media>['resource'];
}>;

export const InvestorModelContactSectionImage = ({
	resource,
}: InvestorModelContactSectionImageProps) => (
	<div className="relative hidden aspect-square w-full xl:block">
		<Media
			resource={resource}
			fill
			sizes="50vw"
			className="rounded-l-2xl object-cover"
		/>
	</div>
);
