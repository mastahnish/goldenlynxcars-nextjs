import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

import type { CollectionSlug } from 'payload';

const getCollection = async <TSlug extends CollectionSlug>(
	slug: TSlug,
	limit?: number,
) => {
	const payload = await getPayloadHMR({ config });
	const collection = await payload.find({
		collection: slug,
		limit,
	});

	return collection;
};

interface getCachedCollectionOptions {
	tags?: string[];
	limit?: number;
}

export const getCachedCollection = <TSlug extends CollectionSlug>(
	slug: TSlug,
	{ tags = [], limit }: getCachedCollectionOptions = {},
) =>
	unstable_cache(() => getCollection(slug, limit), [slug], {
		tags: [`collection_${slug}`, ...tags],
	});
