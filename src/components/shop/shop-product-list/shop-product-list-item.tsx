import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button/button';
import { ShoppingCart } from '@/components/ui/icons';

import { formatPrice } from '@/utils/shop.utils';

import type { Product } from '@/lib/shop';

type ShopProductListItemProps = Readonly<{
	product: Product;
}>;

export const ShopProductListItem = ({ product }: ShopProductListItemProps) => (
	<Link
		href={`/shop/${product.metadata.slug}`}
		className="mx-auto block w-full max-w-96 rounded-2xl border border-primary/10 bg-semi-black p-4"
	>
		<div className="relative aspect-product-thumbnail">
			<Image
				src={product.images[0]}
				alt="alt"
				fill
				className="rounded-xl object-cover"
			/>
		</div>
		<div className="my-4 flex h-28 flex-col justify-between text-white">
			<h2 className="text-2xl font-bold">{product.name}</h2>
			<p className="text-2xl font-medium">
				{formatPrice(product.default_price.unit_amount)}zł
			</p>
		</div>
		<Button size="small" color="white" icon={ShoppingCart} fullWidth>
			Dodaj do koszyka
		</Button>
	</Link>
);
