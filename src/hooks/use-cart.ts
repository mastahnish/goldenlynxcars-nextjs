import { useGetAllProducts } from './use-get-all-products';

import { useCartStore } from '@/lib/cart-store';

import type * as shop from '@/lib/shop';

export interface CartItem {
	product: shop.Product;
	amount: number;
}

export const useCart = () => {
	const { items, addToCart, deleteFromCart, clearCart, updateAmount } =
		useCartStore();
	const { data, isLoading } = useGetAllProducts();

	const cartItems = items
		.map(({ productId, amount }) => {
			const product = data?.find(({ id }) => id === productId);

			if (!product) {
				return null;
			}

			return { product, amount };
		})
		.filter(item => item !== null);
	const cartItemsAmount = isLoading ? items.length : cartItems.length;

	return {
		isLoading,
		cartItems,
		cartItemsAmount,
		addToCart,
		deleteFromCart,
		clearCart,
		updateAmount,
	};
};
