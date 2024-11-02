'use client';

import { useState } from 'react';
import { Lightbox } from 'yet-another-react-lightbox';

import { ProductGalleryCarousel } from './product-gallery-carousel/product-gallery-carousel';
import { getGallerySlides } from './product-gallery-inner.utils';
import { ProductGalleryThumbnails } from './product-gallery-thumbnails';

import type { SwiperClass } from 'swiper/react';

import type { Media } from '@/payload/payload-types';

type ProductGalleryInnerProps = Readonly<{
	gallery: Media[];
}>;

export const ProductGalleryInner = ({ gallery }: ProductGalleryInnerProps) => {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [lightboxIndex, setLightboxIndex] = useState(-1);

	const slides = getGallerySlides(gallery);

	return (
		<div className="w-full overflow-hidden">
			<ProductGalleryCarousel
				gallery={gallery}
				swiper={swiper}
				setSwiper={setSwiper}
				setLightboxIndex={setLightboxIndex}
			/>
			<ProductGalleryThumbnails
				gallery={gallery}
				swiper={swiper}
				setLightboxIndex={setLightboxIndex}
			/>
			<Lightbox
				index={lightboxIndex}
				open={lightboxIndex >= 0}
				close={() => setLightboxIndex(-1)}
				slides={slides}
			/>
		</div>
	);
};
