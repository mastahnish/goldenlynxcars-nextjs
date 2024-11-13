'use client';

import { ShoppingCartDrawerProductListItem } from './shopping-cart-drawer-product-list-item/shopping-cart-drawer-product-list-item';

import { useCart } from '@/hooks/use-cart';

export const ShoppingCartDrawerProductList = () => {
	const { cartItems } = useCart();

	return (
		<ul className="divide-y divide-neutral-600 overflow-y-scroll scrollbar scrollbar-thumb-neutral-400 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-1.5">
			{cartItems.map(({ product, amount }) => (
				<li key={product.id}>
					<ShoppingCartDrawerProductListItem
						product={product}
						amount={amount}
					/>
				</li>
			))}
		</ul>
	);
};
