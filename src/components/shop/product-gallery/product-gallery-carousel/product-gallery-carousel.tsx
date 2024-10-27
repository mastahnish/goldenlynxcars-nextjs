import { Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Media } from '@/components/common/media/media';

import type { SwiperClass } from 'swiper/react';

import type { Product } from '@/types/shop.types';

import styles from './product-gallery-carousel.module.css';

type ProductGalleryCarouselProps = Readonly<{
	product: Product;
	swiper: SwiperClass | null;
	setSwiper: (swiper: SwiperClass) => void;
	setLightboxIndex: (index: number) => void;
}>;

export const ProductGalleryCarousel = ({
	product,
	swiper,
	setSwiper,
	setLightboxIndex,
}: ProductGalleryCarouselProps) => (
	<Swiper
		modules={[Controller, Navigation, Pagination]}
		slidesPerView={1}
		controller={{ control: swiper }}
		onSwiper={setSwiper}
		pagination
		navigation
		className={styles.wrapper}
		onClick={() => setLightboxIndex(swiper?.activeIndex ?? -1)}
	>
		{product.gallery.map(media => (
			<SwiperSlide key={media.id}>
				<div className="relative aspect-square">
					<Media resource={media.image} fill className="object-cover" />
				</div>
			</SwiperSlide>
		))}
	</Swiper>
);
