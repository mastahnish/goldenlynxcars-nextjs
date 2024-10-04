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
