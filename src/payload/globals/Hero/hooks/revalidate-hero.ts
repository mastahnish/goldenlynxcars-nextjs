import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook } from 'payload';

export const revalidateHero: GlobalAfterChangeHook = ({ doc }) => {
	revalidateTag('global_hero');

	return doc;
};
