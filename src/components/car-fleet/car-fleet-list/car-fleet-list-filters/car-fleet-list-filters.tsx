import { CarFleetListFiltersInner } from './car-fleet-list-filters-inner';

import { removeDuplicates } from '@/utils/array.utils';

import type {
	CarFleet,
	CarFleetBrand,
	CarFleetType,
} from '@/payload/payload-types';

type CarFleetListFiltersProps = Readonly<{
	carFleet: CarFleet[];
	brands: CarFleetBrand[];
	types: CarFleetType[];
}>;

export const CarFleetListFilters = ({
	carFleet,
	brands,
	types,
}: CarFleetListFiltersProps) => {
	const brandsOptions = brands.map(({ id, brand }) => ({
		value: id.toString(),
		label: brand,
	}));
	const typesOptions = types.map(({ id, type }) => ({
		value: id.toString(),
		label: type,
	}));
	const pricesOptions = removeDuplicates(
		carFleet.map(({ price }) => price.toString()),
	).map(price => ({
		value: price,
		label: price,
	}));
	const seatsOptions = removeDuplicates(
		carFleet.map(({ details }) => details.seats.toString()),
	).map(seats => ({
		value: seats,
		label: seats,
	}));

	return (
		<CarFleetListFiltersInner
			brands={brandsOptions}
			types={typesOptions}
			prices={pricesOptions}
			seats={seatsOptions}
		/>
	);
};
