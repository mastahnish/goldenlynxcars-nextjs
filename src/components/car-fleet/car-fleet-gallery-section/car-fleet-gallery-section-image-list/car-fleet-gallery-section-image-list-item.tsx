import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import type { Slide } from 'yet-another-react-lightbox';

type CarFleetGallerySectionImageListItemProps = Readonly<{
	slide: Slide;
	overflow?: number;
	onClick: () => void;
}>;

export const CarFleetGallerySectionImageListItem = ({
	slide,
	overflow,
	onClick,
}: CarFleetGallerySectionImageListItemProps) => (
	<button
		type="button"
		onClick={onClick}
		className="relative aspect-square w-full overflow-hidden rounded-2xl"
	>
		<Image
			src={slide.src}
			alt={slide.alt ?? ''}
			fill
			className={twMerge('object-cover', overflow && 'blur-sm')}
		/>
		{overflow && (
			<p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white p-3.5 text-2xl text-white">
				{overflow + 1} +
			</p>
		)}
	</button>
);
