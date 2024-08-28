import { Media } from '@/components/common/media/media';

import type { Media as MediaType } from '@/payload/payload-types';

type RealizationsSectionListItemVideoProps = Readonly<{
	video: MediaType | number;
}>;

export const RealizationsSectionListItemVideo = ({
	video,
}: RealizationsSectionListItemVideoProps) => (
	<div className="relative w-full max-sm:aspect-video sm:h-96">
		<Media
			resource={video}
			fill
			className="object-cover max-sm:rounded-t-2xl sm:rounded-l-2xl"
		/>
	</div>
);
