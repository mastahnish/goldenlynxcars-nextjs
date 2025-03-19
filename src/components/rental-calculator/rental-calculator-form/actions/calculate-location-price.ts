'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

import { getDistanceBetweenPlaces } from '@/actions/google-maps-api';

interface CalculateLocationPriceInput {
	carId: string;
	defaultAddress: string;
	collectionAddress: string;
	returnAddress: string;
}

export const calculateLocationPrice = async ({
	carId,
	defaultAddress,
	collectionAddress,
	returnAddress,
}: CalculateLocationPriceInput) => {
	const payload = await getPayload({ config });
	const car = await payload.findByID({
		collection: 'car-fleet',
		id: carId,
	});

	if (!car) {
		return 0;
	}

	let price = 0;

	for (const address of [collectionAddress, returnAddress]) {
		const distance = await getDistanceBetweenPlaces({
			destination: address,
			origin: defaultAddress,
		});

		if (distance <= 20) {
			continue;
		}

		const additionalDistance = Math.round(distance / 1000) - 20;

		price += additionalDistance * car.additionalMileagePrice;
	}

	return price;
};
