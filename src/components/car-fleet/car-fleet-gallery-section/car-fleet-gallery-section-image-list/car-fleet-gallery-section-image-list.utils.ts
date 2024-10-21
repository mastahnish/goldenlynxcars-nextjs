import { getMediaMetadata } from '@/utils/payload.utils';

import type { CarFleet } from '@/payload/payload-types';

export const getGallerySlides = (car: CarFleet) => {
	const medias =
		car.media?.gallery
			?.map(media => media.image)
			.filter(media => typeof media === 'object' && media !== null) ?? [];

	return medias.map(media => getMediaMetadata(media));
};
