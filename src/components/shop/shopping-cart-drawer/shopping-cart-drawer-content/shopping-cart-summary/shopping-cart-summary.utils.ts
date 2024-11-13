import type { CartItem } from '@/hooks/use-cart';

export const calculateTotalPrice = (items: CartItem[]) => {
	const prices = items.map(
		({ product, amount }) => (product.default_price.unit_amount ?? 0) * amount,
	);

	return prices.reduce((prev, curr) => prev + curr, 0);
};
