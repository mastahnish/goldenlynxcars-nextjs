import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateServicesSection: GlobalAfterChangeHook = ({ doc }) => {
	revalidateTag('global_services_section');

	return doc;
};
