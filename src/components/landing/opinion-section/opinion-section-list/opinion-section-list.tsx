'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { OpinionSectionListItem } from './opinion-section-list-item/opinion-section-list-item';

import type { Opinion } from '../opinion-section.types';

type OpinionSectionListProps = Readonly<{
	opinions: Opinion[];
}>;

export const OpinionSectionList = ({ opinions }: OpinionSectionListProps) => (
	<Swiper
		modules={[Pagination]}
		spaceBetween={12}
		breakpoints={{
			768: {
				slidesPerView: 2,
			},
			896: {
				slidesPerView: 3,
			},
		}}
		pagination
		className="mt-20"
	>
		{opinions.map((opinion, i) => (
			<SwiperSlide key={opinion.id ?? i}>
				<OpinionSectionListItem opinion={opinion} />
			</SwiperSlide>
		))}
	</Swiper>
);
