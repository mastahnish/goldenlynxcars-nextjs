import { ShoppingCartDrawerProductListItemDetails } from './shopping-cart-drawer-product-list-item-details/shopping-cart-drawer-product-list-item-details';
import { ShoppingCartDrawerProductListItemImage } from './shopping-cart-drawer-product-list-item-image';
import { ShoppingCartDrawerProductListItemSummary } from './shopping-cart-drawer-product-list-item-summary/shopping-cart-drawer-product-list-item-summary';

import type { Product } from '@/lib/shop';

type ShoppingCartDrawerProductListItemProps = Readonly<{
	product: Product;
	amount: number;
}>;

export const ShoppingCartDrawerProductListItem = ({
	product,
	amount,
}: ShoppingCartDrawerProductListItemProps) => (
	<div className="flex gap-4 p-6">
		<ShoppingCartDrawerProductListItemImage product={product} />
		<ShoppingCartDrawerProductListItemDetails
			product={product}
			amount={amount}
		/>
		<ShoppingCartDrawerProductListItemSummary
			product={product}
			amount={amount}
		/>
	</div>
);
