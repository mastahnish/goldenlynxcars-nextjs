import Link from 'next/link';

import { Media } from '@/components/common/media/media';
import { Button } from '@/components/ui/button/button';
import { ShoppingCart } from '@/components/ui/icons';

import type { Product } from '@/types/shop.types';

type ShopProductListItemProps = Readonly<{
	product: Product;
}>;

export const ShopProductListItem = ({ product }: ShopProductListItemProps) => (
	<Link
		href={`/shop/${product.slug}`}
		className="mx-auto block w-full max-w-96 rounded-2xl border border-primary/10 bg-semi-black p-4"
	>
		<div className="relative aspect-product-thumbnail">
			<Media
				resource={product.thumbnail}
				fill
				className="rounded-xl object-cover"
			/>
		</div>
		<div className="my-4 flex h-28 flex-col justify-between text-white">
			<h2 className="text-2xl font-bold">{product.name}</h2>
			<p className="text-2xl font-medium">{product.price}zł</p>
		</div>
		<Button size="small" color="white" icon={ShoppingCart} fullWidth>
			Dodaj do koszyka
		</Button>
	</Link>
);
