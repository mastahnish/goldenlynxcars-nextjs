import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateCarFleetSection: GlobalAfterChangeHook = ({ doc }) => {
	revalidateTag('global_car_fleet_section');

	return doc;
};
