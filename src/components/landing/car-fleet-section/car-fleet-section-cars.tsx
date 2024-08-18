'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CarFleetCard } from '@/components/car-fleet/car-fleet-card/car-fleet-card';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetSectionCarsProps = Readonly<{
	cars: CarFleet[];
}>;

export const CarFleetSectionCars = ({ cars }: CarFleetSectionCarsProps) => (
	<Swiper
		modules={[Autoplay, Pagination]}
		spaceBetween={12}
		breakpoints={{
			768: {
				slidesPerView: 2,
			},
			896: {
				slidesPerView: 3,
			},
		}}
		autoplay={{
			delay: 5000,
		}}
		loop
		pagination
	>
		{cars.map(car => (
			<SwiperSlide key={car.id}>
				<CarFleetCard car={car} />
			</SwiperSlide>
		))}
	</Swiper>
);
