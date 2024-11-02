import { ShopProductListItem } from './shop-product-list-item';

import { Container } from '@/components/common/container';

import type { Product } from '@/lib/shop';

type ShopProductListProps = Readonly<{
	products: Product[];
}>;

export const ShopProductList = ({ products }: ShopProductListProps) => (
	<Container
		as="ul"
		className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
	>
		{products.map(product => (
			<li key={product.id}>
				<ShopProductListItem product={product} />
			</li>
		))}
	</Container>
);
