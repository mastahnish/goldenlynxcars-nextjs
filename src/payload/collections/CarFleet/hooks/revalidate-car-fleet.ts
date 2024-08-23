import { revalidateTag } from 'next/cache';

import type { CollectionAfterChangeHook } from 'payload';

export const revalidateCarFleet: CollectionAfterChangeHook = ({ doc }) => {
	revalidateTag('collection_car_fleet');

	return doc;
};
