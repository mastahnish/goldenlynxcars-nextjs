import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

import type { GlobalSlug } from 'payload';

const getGlobal = async <TSlug extends GlobalSlug>(slug: TSlug) => {
	const payload = await getPayloadHMR({ config });
	const global = await payload.findGlobal({
		slug,
	});

	return global;
};

interface GetCachedGlobalOptions {
	tags?: string[];
}

export const getCachedGlobal = <TSlug extends GlobalSlug>(
	slug: TSlug,
	{ tags = [] }: GetCachedGlobalOptions = {},
) =>
	unstable_cache(() => getGlobal(slug), [slug], {
		tags: [`global_${slug}`, ...tags],
	});
