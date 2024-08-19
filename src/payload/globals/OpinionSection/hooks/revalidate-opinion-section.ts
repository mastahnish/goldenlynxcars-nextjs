import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateOpinionSection: GlobalAfterChangeHook = ({ doc }) => {
	revalidateTag('global_opinion_section');

	return doc;
};
