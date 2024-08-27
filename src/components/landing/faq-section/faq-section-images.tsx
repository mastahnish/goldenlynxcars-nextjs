import { twMerge } from 'tailwind-merge';

import { Media } from '@/components/common/media/media';

import type { Media as MediaType } from '@/payload/payload-types';

type FAQSectionImagesProps = Readonly<{
	firstImage: MediaType;
	secondImage: MediaType;
}>;

export const FAQSectionImages = ({
	firstImage,
	secondImage,
}: FAQSectionImagesProps) => (
	<div
		className={twMerge(
			'w-fit shrink-0 relative',
			'before:size-20 before:border-l before:border-t before:border-primary/10 before:rounded-tl-3xl before:absolute before:-left-4 before:-top-4',
			'after:size-20 after:border-r after:border-b after:border-primary/10 after:rounded-br-3xl after:absolute after:-right-4 after:-bottom-4',
		)}
	>
		<Media
			resource={firstImage}
			width={256}
			height={256}
			className="size-64 rounded-3xl object-cover"
		/>
		<Media
			resource={secondImage}
			width={256}
			height={256}
			className="-mt-14 ml-12 size-64 rounded-3xl object-cover"
		/>
	</div>
);
