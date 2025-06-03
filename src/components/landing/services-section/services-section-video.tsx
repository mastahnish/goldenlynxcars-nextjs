import { twMerge } from 'tailwind-merge';

import { Media } from '@/components/common/media/media';

import type { Media as MediaType } from '@/payload/payload-types';

type ServicesSectionVideoProps = Readonly<{
	video: MediaType | number;
}>;

export const ServicesSectionVideo = ({ video }: ServicesSectionVideoProps) => (
	<div
		className={twMerge(
			'relative aspect-video',
			'before:size-20 before:border-l-2 before:border-t-2 before:border-secondary/50 before:rounded-tl-2xl before:absolute before:-left-3 before:-top-3',
			'after:size-20 after:border-r-2 after:border-b-2 after:border-secondary/50 after:rounded-br-2xl after:absolute after:-right-3 after:-bottom-3',
		)}
	>
		<Media resource={video} autoPlay muted className="rounded-xl" fill />
	</div>
);
