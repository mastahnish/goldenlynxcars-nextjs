import { Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Media } from '@/components/common/media/media';

import type { SwiperClass } from 'swiper/react';

import type { Media as PayloadMedia } from '@/payload/payload-types';

import styles from './product-gallery-carousel.module.css';

type ProductGalleryCarouselProps = Readonly<{
	gallery: PayloadMedia[];
	swiper: SwiperClass | null;
	setSwiper: (swiper: SwiperClass) => void;
	setLightboxIndex: (index: number) => void;
}>;

export const ProductGalleryCarousel = ({
	gallery,
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
		{gallery.map(media => (
			<SwiperSlide key={media.id}>
				<div className="relative aspect-square">
					<Media resource={media} fill className="object-cover" />
				</div>
			</SwiperSlide>
		))}
	</Swiper>
);
