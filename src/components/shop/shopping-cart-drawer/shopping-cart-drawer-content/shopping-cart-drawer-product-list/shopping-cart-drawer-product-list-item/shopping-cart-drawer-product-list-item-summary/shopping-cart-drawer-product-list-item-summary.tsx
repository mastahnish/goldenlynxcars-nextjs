import { useShoppingCartDrawerProductListItemSummary } from './use-shopping-cart-drawer-product-list-item-summary';

import { formatPrice } from '@/utils/shop.utils';

import type { Product } from '@/lib/shop';

type ShoppingCartDrawerProductListItemSummaryProps = Readonly<{
	product: Product;
	amount: number;
}>;

export const ShoppingCartDrawerProductListItemSummary = ({
	product,
	amount,
}: ShoppingCartDrawerProductListItemSummaryProps) => {
	const { handleDeleteFromCart } = useShoppingCartDrawerProductListItemSummary({
		product,
	});

	return (
		<div className="flex flex-col">
			<p>
				{formatPrice((product.default_price.unit_amount ?? 0) * amount)}
				zł
			</p>
			<button
				type="button"
				onClick={handleDeleteFromCart}
				className="mt-auto font-semibold text-secondary"
			>
				Usuń
			</button>
		</div>
	);
};
