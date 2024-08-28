import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateRealizationsSection: GlobalAfterChangeHook = ({
	doc,
}) => {
	revalidateTag('global_realizations_section');

	return doc;
};
