import { formatPrice } from '@/utils/shop.utils';

import type { Product } from '@/lib/shop';

type ShopProductListItemDetailsProps = Readonly<{
	product: Product;
}>;

export const ShopProductListItemDetails = ({
	product,
}: ShopProductListItemDetailsProps) => (
	<div className="my-4 flex h-28 flex-col justify-between text-white">
		<h2 className="text-2xl font-bold">{product.name}</h2>
		<p className="text-2xl font-medium">
			{formatPrice(product.default_price.unit_amount)}zł
		</p>
	</div>
);
