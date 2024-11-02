import { Media } from '@/components/common/media/media';

import type { SwiperClass } from 'swiper/react';

import type { Media as PayloadMedia } from '@/payload/payload-types';

type ProductGalleryThumbnailsProps = Readonly<{
	gallery: PayloadMedia[];
	swiper: SwiperClass | null;
	setLightboxIndex: (index: number) => void;
}>;

export const ProductGalleryThumbnails = ({
	gallery,
	swiper,
	setLightboxIndex,
}: ProductGalleryThumbnailsProps) => (
	<div className="hidden gap-3 sm:flex">
		{gallery.map((media, i) => (
			<div
				key={media.id}
				onMouseOver={() => swiper?.slideTo(i)}
				onClick={() => setLightboxIndex(i)}
				className="relative aspect-square w-full cursor-pointer"
			>
				<Media resource={media} fill className="object-cover" />
			</div>
		))}
	</div>
);
