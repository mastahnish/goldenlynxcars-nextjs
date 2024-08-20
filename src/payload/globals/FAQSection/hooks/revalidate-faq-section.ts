import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateFAQSection: GlobalAfterChangeHook = ({ doc }) => {
	revalidateTag('global_faq_section');

	return doc;
};
