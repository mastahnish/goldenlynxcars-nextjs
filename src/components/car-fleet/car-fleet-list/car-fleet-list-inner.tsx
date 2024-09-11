'use client';

import { CarFleetCard } from '../car-fleet-card/car-fleet-card';
import { useCarFleetListFilters } from './use-car-fleet-list-filters';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetListInnerProps = Readonly<{
	cars: CarFleet[];
}>;

export const CarFleetListInner = ({ cars }: CarFleetListInnerProps) => {
	const { name, brand, type, price, seats } = useCarFleetListFilters();

	const filteredCars = cars.filter(
		car =>
			(!name || car.name.toLowerCase().includes(name.toLowerCase())) &&
			(!brand ||
				typeof car.brand === 'number' ||
				car.brand.id == Number(brand)) &&
			(!type || typeof car.type === 'number' || car.type.id == Number(type)) &&
			(!price || car.price == Number(price)) &&
			(!seats || car.details.seats == Number(seats)),
	);

	return (
		<ul className="space-y-4 md:space-y-12">
			{filteredCars.map(car => (
				<li key={car.id}>
					<CarFleetCard car={car} layout="horizontal" />
				</li>
			))}
		</ul>
	);
};
