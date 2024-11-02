import { getMediaMetadata } from '@/utils/payload.utils';

import type { Media } from '@/payload/payload-types';

export const getGallerySlides = (gallery: Media[]) => {
	const medias = gallery.filter(
		media => typeof media === 'object' && media !== null,
	);

	return medias.map(media => getMediaMetadata(media));
};
