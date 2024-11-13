import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

import { ProductGalleryInner } from './product-gallery-inner';

import type { Product } from '@/lib/shop';

type ProductGalleryProps = Readonly<{
	product: Product;
}>;

export const ProductGallery = async ({ product }: ProductGalleryProps) => {
	const mediaIds = product.metadata.gallery.split(',');

	const payload = await getPayloadHMR({ config });
	const gallery = await payload.find({
		collection: 'media',
		where: {
			or: mediaIds.map(mediaId => ({ id: { equals: mediaId } })),
		},
	});

	return <ProductGalleryInner gallery={gallery.docs} />;
};
