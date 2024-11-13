import Link from 'next/link';

import { ShopProductListItemAddToCartButton } from './shop-product-list-item-add-to-cart-button/shop-product-list-item-add-to-cart-button';
import { ShopProductListItemDetails } from './shop-product-list-item-details';
import { ShopProductListItemImage } from './shop-product-list-item-image';

import type { Product } from '@/lib/shop';

type ShopProductListItemProps = Readonly<{
	product: Product;
}>;

export const ShopProductListItem = ({ product }: ShopProductListItemProps) => (
	<Link
		href={`/shop/${product.metadata.slug}`}
		className="mx-auto block w-full max-w-96 rounded-2xl border border-primary/10 bg-semi-black p-4"
	>
		<ShopProductListItemImage product={product} />
		<ShopProductListItemDetails product={product} />
		<ShopProductListItemAddToCartButton product={product} />
	</Link>
);
