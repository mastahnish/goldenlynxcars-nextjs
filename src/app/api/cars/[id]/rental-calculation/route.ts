import config from '@payload-config';
import { getPayload } from 'payload';
import { z } from 'zod';

import { calculateLocationPrice } from './utils/calculate-location-price';
import { calculateMileageLimit } from './utils/calculate-mileage-limit';
import { calculateRentalPrice } from './utils/calculate-rental-price';

import type { NextRequest } from 'next/server';

export const DEFAULT_ADDRESS = 'ul. Krótka 2/2, Dębgórze-Wybudowanie 84-230';

const payloadSchema = z.object({
	startDate: z.date({ coerce: true }),
	endDate: z.date({ coerce: true }),
	collectionAddress: z.coerce.string().default(DEFAULT_ADDRESS),
	returnAddress: z.coerce.string().default(DEFAULT_ADDRESS),
	additionalMileageLimit: z.coerce.number().default(0),
});

export const GET = async (
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) => {
	const { id } = await params;

	const payload = await getPayload({ config });
	const car = await payload.findByID({
		collection: 'car-fleet',
		id,
	});

	if (!car) {
		return new Response(null, { status: 404 });
	}

	const searchParams = request.nextUrl.searchParams;
	const { data, error } = await payloadSchema.safeParseAsync({
		startDate: searchParams.get('startDate'),
		endDate: searchParams.get('endDate'),
		collectionAddress: searchParams.get('collectionAddress'),
		returnAddress: searchParams.get('returnAddress'),
		additionalMileageLimit: searchParams.get('additionalMileageLimit'),
	});

	if (error) {
		return new Response(null, { status: 400 });
	}

	const rentalPrice = calculateRentalPrice({ car, ...data });
	const locationPrice = await calculateLocationPrice({ car, ...data });
	const additionalMileagePrice =
		car.additionalMileagePrice * data.additionalMileageLimit;

	const mileageLimit = calculateMileageLimit({ car, ...data });

	const price = rentalPrice + additionalMileagePrice + locationPrice;
	const totalMileageLimit = mileageLimit + data.additionalMileageLimit;

	return new Response(
		JSON.stringify({
			deposit: car.deposit,
			price,
			mileageLimit: totalMileageLimit,
		}),
	);
};
