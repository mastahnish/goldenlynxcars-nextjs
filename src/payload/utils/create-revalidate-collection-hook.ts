import { revalidateTag } from 'next/cache';

import type { CollectionAfterChangeHook, CollectionSlug } from 'payload';

export const createRevalidateCollectionHook =
	(slug: CollectionSlug): CollectionAfterChangeHook =>
	({ doc }) => {
		revalidateTag(`collection_${slug}`);

		return doc;
	};
