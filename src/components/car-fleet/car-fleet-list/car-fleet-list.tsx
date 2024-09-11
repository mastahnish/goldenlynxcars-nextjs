import { Suspense } from 'react';

import { CarFleetListFilters } from './car-fleet-list-filters/car-fleet-list-filters';
import { CarFleetListInner } from './car-fleet-list-inner';

import { Container } from '@/components/common/container';

import { getCachedCollection } from '@/lib/get-cached-collection';

import type { CarFleet } from '@/payload/payload-types';

type CarFleetListProps = Readonly<{
	cars: CarFleet[];
}>;

export const CarFleetList = async ({ cars }: CarFleetListProps) => {
	const carFleet = await getCachedCollection('car-fleet')();
	const brandsCollection = await getCachedCollection('car-fleet-brands')();
	const typesCollection = await getCachedCollection('car-fleet-types')();

	return (
		<Suspense>
			<Container className="flex justify-center gap-6">
				<CarFleetListFilters
					carFleet={carFleet.docs}
					brands={brandsCollection.docs}
					types={typesCollection.docs}
				/>
				<CarFleetListInner cars={cars} />
			</Container>
		</Suspense>
	);
};
