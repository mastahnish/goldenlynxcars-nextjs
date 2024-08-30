import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

import type { CollectionSlug } from 'payload';

const getCollection = async <TSlug extends CollectionSlug>(slug: TSlug) => {
	const payload = await getPayloadHMR({ config });
	const collection = await payload.find({
		collection: slug,
	});

	return collection;
};

interface getCachedCollectionOptions {
	tags?: string[];
}

export const getCachedCollection = <TSlug extends CollectionSlug>(
	slug: TSlug,
	{ tags = [] }: getCachedCollectionOptions = {},
) =>
	unstable_cache(() => getCollection(slug), [slug], {
		tags: [`collection_${slug}`, ...tags],
	});
