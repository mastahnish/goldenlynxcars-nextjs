'use client';

import { useState } from 'react';
import { Lightbox } from 'yet-another-react-lightbox';

import { getProductGallerySlides } from './product-gallery.utils';
import { ProductGalleryCarousel } from './product-gallery-carousel/product-gallery-carousel';
import { ProductGalleryThumbnails } from './product-gallery-thumbnails';

import type { SwiperClass } from 'swiper/react';

import type { Product } from '@/types/shop.types';

type ProductGalleryProps = Readonly<{
	product: Product;
}>;

export const ProductGallery = ({ product }: ProductGalleryProps) => {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [lightboxIndex, setLightboxIndex] = useState(-1);

	const slides = getProductGallerySlides(product);

	return (
		<div className="w-full overflow-hidden">
			<ProductGalleryCarousel
				product={product}
				swiper={swiper}
				setSwiper={setSwiper}
				setLightboxIndex={setLightboxIndex}
			/>
			<ProductGalleryThumbnails
				product={product}
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
