import { env } from '@/lib/env';

import type { Media } from '@/payload/payload-types';

export const getMediaMetadata = (media: Media) => {
	const { alt, url } = media;
	const src = `${env.NEXT_PUBLIC_SERVER_BASE_URL}${url}`;

	return {
		src,
		alt,
		width: media.width ?? 0,
		height: media.height ?? 0,
	};
};
