import { useShoppingCartDrawerProductListItemDetailsAmountSelect } from './use-shopping-cart-drawer-product-list-item-details-amount-select';

import type { Product } from '@/lib/shop';

type ShoppingCartDrawerProductListItemDetailsAmountSelectProps = Readonly<{
	product: Product;
	amount: number;
}>;

export const ShoppingCartDrawerProductListItemDetailsAmountSelect = ({
	product,
	amount,
}: ShoppingCartDrawerProductListItemDetailsAmountSelectProps) => {
	const { amounts, isAmountOverflowed, onAmountChange } =
		useShoppingCartDrawerProductListItemDetailsAmountSelect({
			product,
			amount,
		});

	return (
		<select
			value={amount}
			onChange={onAmountChange}
			aria-label={`Ilość produktu: ${amount}`}
			className="mt-1 cursor-pointer bg-transparent text-primary"
		>
			{amounts.map(amount => (
				<option key={amount} value={amount}>
					x{amount}
				</option>
			))}
			{isAmountOverflowed && (
				<option value={amount} disabled>
					x{amount}
				</option>
			)}
		</select>
	);
};
