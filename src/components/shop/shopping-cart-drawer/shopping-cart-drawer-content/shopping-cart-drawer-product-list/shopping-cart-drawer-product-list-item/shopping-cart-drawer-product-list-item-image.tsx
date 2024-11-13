import Image from 'next/image';

import type { Product } from '@/lib/shop';

type ShoppingCartDrawerProductListItemImageProps = Readonly<{
	product: Product;
}>;

export const ShoppingCartDrawerProductListItemImage = ({
	product,
}: ShoppingCartDrawerProductListItemImageProps) => (
	<div className="relative size-24">
		<Image
			src={product.images[0]}
			alt="TODO"
			fill
			className="rounded object-cover"
		/>
	</div>
);
