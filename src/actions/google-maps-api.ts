'use server';

import { z } from 'zod';

import { env } from '@/lib/env';

const searchPlacesByTextResponse = z.object({
	places: z.array(z.object({ formattedAddress: z.string() })),
});

export const searchPlacesByText = async (textQuery: string) => {
	const data = await fetch(
		'https://places.googleapis.com/v1/places:searchText',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
				'X-Goog-FieldMask': 'places.formattedAddress',
			},
			body: JSON.stringify({ textQuery }),
		},
	).then(res => res.json());

	return searchPlacesByTextResponse.parseAsync(data);
};

const getDistanceBetweenPlacesResponse = z.object({
	rows: z.array(
		z.object({
			elements: z.array(
				z.object({
					distance: z.object({ value: z.number() }),
				}),
			),
		}),
	),
});

interface GetDistanceBetweenPlacesInput {
	origin: string;
	destination: string;
}

export const getDistanceBetweenPlaces = async ({
	origin,
	destination,
}: GetDistanceBetweenPlacesInput) => {
	const data = await fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${env.GOOGLE_PLACES_API_KEY}`,
	).then(res => res.json());
	const parsedData =
		await getDistanceBetweenPlacesResponse.safeParseAsync(data);

	if (parsedData.error) {
		return -1;
	}

	return parsedData.data.rows[0].elements[0].distance.value;
};
