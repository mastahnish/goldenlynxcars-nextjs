import { DEFAULT_ADDRESS } from '../route';

import { getDistanceBetweenPlaces } from '@/actions/google-maps-api';

import type { CarFleet } from '@/payload/payload-types';

interface CalculateLocationPriceParams {
	car: CarFleet;
	collectionAddress: string;
	returnAddress: string;
}

export const calculateLocationPrice = async ({
	car,
	collectionAddress,
	returnAddress,
}: CalculateLocationPriceParams) => {
	let price = 0;

	for (const address of [collectionAddress, returnAddress]) {
		const distance = await getDistanceBetweenPlaces({
			destination: address,
			origin: DEFAULT_ADDRESS,
		});

		if (distance <= 20) {
			continue;
		}

		const additionalDistance = Math.round(distance / 1000) - 20;

		price += additionalDistance * car.additionalMileagePrice;
	}

	return price;
};
