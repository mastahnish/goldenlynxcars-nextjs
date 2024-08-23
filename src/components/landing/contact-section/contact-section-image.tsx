import { Media } from '@/components/common/media';

import type { ComponentProps } from 'react';

type ContactSectionImageProps = Readonly<{
	resource: ComponentProps<typeof Media>['resource'];
}>;

export const ContactSectionImage = ({ resource }: ContactSectionImageProps) => (
	<div className="relative hidden aspect-square w-full xl:block">
		<Media
			resource={resource}
			fill
			sizes="50vw"
			className="rounded-l-2xl object-cover"
		/>
	</div>
);
