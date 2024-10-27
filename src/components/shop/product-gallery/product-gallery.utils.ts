import { getMediaMetadata } from '@/utils/payload.utils';

import type { Product } from '@/types/shop.types';

export const getProductGallerySlides = (product: Product) => {
	const medias = product.gallery
		.map(media => media.image)
		.filter(media => typeof media === 'object' && media !== null);

	return medias.map(media => getMediaMetadata(media));
};
