import Image from 'next/image';

import type { Product } from '@/lib/shop';

type ShopProductListItemImageProps = Readonly<{
	product: Product;
}>;

export const ShopProductListItemImage = ({
	product,
}: ShopProductListItemImageProps) => (
	<div className="relative aspect-product-thumbnail">
		<Image
			src={product.images[0]}
			alt="TODO"
			fill
			className="rounded-xl object-cover"
		/>
	</div>
);
