import { revalidateTag } from 'next/cache';

import type { GlobalAfterChangeHook, GlobalSlug } from 'payload';

export const createRevalidateGlobalHook =
	(slug: GlobalSlug): GlobalAfterChangeHook =>
	({ doc }) => {
		revalidateTag(`global_${slug}`);

		return doc;
	};
