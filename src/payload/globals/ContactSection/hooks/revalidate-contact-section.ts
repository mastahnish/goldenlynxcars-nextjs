import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateContactSection: GlobalAfterChangeHook = ({ doc }) => {
	revalidateTag('global_contact_section');

	return doc;
};
