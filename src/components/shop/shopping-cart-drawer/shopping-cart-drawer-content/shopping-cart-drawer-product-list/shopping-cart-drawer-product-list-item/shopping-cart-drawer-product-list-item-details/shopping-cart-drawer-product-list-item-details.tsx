import { ShoppingCartDrawerProductListItemDetailsAmountSelect } from './shopping-cart-drawer-product-list-item-details-amount-select/shopping-cart-drawer-product-list-item-details-amount-select';

import type { Product } from '@/lib/shop';

type ShoppingCartDrawerProductListItemDetailsProps = Readonly<{
	product: Product;
	amount: number;
}>;

export const ShoppingCartDrawerProductListItemDetails = ({
	product,
	amount,
}: ShoppingCartDrawerProductListItemDetailsProps) => (
	<div>
		<h3 className="text-lg">{product.name}</h3>
		<ShoppingCartDrawerProductListItemDetailsAmountSelect
			product={product}
			amount={amount}
		/>
	</div>
);
