import { generateAmounts } from './shopping-cart-drawer-product-list-item-details-amount-select.utils';

import { useCart } from '@/hooks/use-cart';

import type { ChangeEvent } from 'react';

import type { Product } from '@/lib/shop';

interface UseShoppingCartDrawerProductListItemDetailsAmountSelectParams {
	product: Product;
	amount: number;
}

export const useShoppingCartDrawerProductListItemDetailsAmountSelect = ({
	product,
	amount,
}: UseShoppingCartDrawerProductListItemDetailsAmountSelectParams) => {
	const { updateAmount } = useCart();

	const amounts = generateAmounts();
	const isAmountOverflowed = amount > amounts.length;

	const onAmountChange = ({ target }: ChangeEvent<HTMLSelectElement>) =>
		updateAmount(product, Number(target.value));

	return { amounts, isAmountOverflowed, onAmountChange };
};
