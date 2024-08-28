'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RealizationsSectionListItem } from './realizations-section-list-item/realizations-section-list-item';

import type { Realization } from '../realizations-section.types';

type RealizationsSectionListProps = Readonly<{
	realizations: Realization[];
}>;

export const RealizationsSectionList = ({
	realizations,
}: RealizationsSectionListProps) => (
	<Swiper
		modules={[Pagination]}
		spaceBetween={12}
		breakpoints={{
			900: {
				slidesPerView: 2,
			},
		}}
		pagination
		className="mt-20"
	>
		{realizations.map((realization, i) => (
			<SwiperSlide key={realization.id ?? i}>
				<RealizationsSectionListItem realization={realization} />
			</SwiperSlide>
		))}
	</Swiper>
);
