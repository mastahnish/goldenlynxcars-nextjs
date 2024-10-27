import { Media } from '@/components/common/media/media';

import type { SwiperClass } from 'swiper/react';

import type { Product } from '@/types/shop.types';

type ProductGalleryThumbnailsProps = Readonly<{
	product: Product;
	swiper: SwiperClass | null;
	setLightboxIndex: (index: number) => void;
}>;

export const ProductGalleryThumbnails = ({
	product,
	swiper,
	setLightboxIndex,
}: ProductGalleryThumbnailsProps) => (
	<div className="hidden gap-3 sm:flex">
		{product.gallery.map((media, i) => (
			<div
				key={media.id}
				onMouseOver={() => swiper?.slideTo(i)}
				onClick={() => setLightboxIndex(i)}
				className="relative aspect-square w-full cursor-pointer"
			>
				<Media resource={media.image} fill className="object-cover" />
			</div>
		))}
	</div>
);
