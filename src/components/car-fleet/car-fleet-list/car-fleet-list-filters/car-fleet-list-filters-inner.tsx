'use client';

import { useCarFleetListFilters } from '../use-car-fleet-list-filters';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select/select';

import type { SelectOptions } from '@/components/ui/select/select';

interface CarFleetListFiltersInnerProps {
	brands: SelectOptions;
	types: SelectOptions;
	prices: SelectOptions;
	seats: SelectOptions;
}

export const CarFleetListFiltersInner = ({
	brands,
	types,
	prices,
	seats: seatsOptions,
}: CarFleetListFiltersInnerProps) => {
	const { name, brand, type, price, seats, setFilters } =
		useCarFleetListFilters();

	return (
		<div className="hidden w-full max-w-44 shrink-0 flex-col gap-4 xs:flex sm:max-w-48 lg:max-w-64">
			<Input
				placeholder="Nazwa auta"
				value={name ?? ''}
				onChange={({ target }) => setFilters({ name: target.value })}
			/>
			<Select
				placeholder="Marka"
				options={brands}
				value={brand ?? undefined}
				onValueChange={value => setFilters({ brand: value })}
			/>
			<Select
				placeholder="Typ"
				options={types}
				value={type ?? undefined}
				onValueChange={value => setFilters({ type: value })}
			/>
			<Select
				placeholder="Cena / dzień"
				options={prices}
				value={price ?? undefined}
				onValueChange={value => setFilters({ price: value })}
			/>
			<Select
				placeholder="Ilość miejsc"
				options={seatsOptions}
				value={seats ?? undefined}
				onValueChange={value => setFilters({ seats: value })}
			/>
		</div>
	);
};
