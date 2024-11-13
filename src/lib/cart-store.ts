import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Product } from './shop';

interface CartItem {
	productId: string;
	amount: number;
}

interface CartStore {
	items: CartItem[];
	addToCart: (product: Product, amount?: number) => void;
	deleteFromCart: (product: Product) => void;
}

export const useCartStore = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			addToCart: (product, amount = 1) => {
				const { items } = get();
				const existingItemIndex = items.findIndex(
					({ productId }) => productId === product.id,
				);

				if (existingItemIndex === -1) {
					const item: CartItem = { productId: product.id, amount };
					const newItems = [...items, item];

					set({ items: newItems });
					return;
				}

				const newItems = [...items];
				const existingItem = newItems[existingItemIndex];

				existingItem.amount += amount;

				set({ items: newItems });
			},
			deleteFromCart: ({ id }) => {
				const { items } = get();
				const filteredItems = items.filter(({ productId }) => id !== productId);

				set({ items: filteredItems });
			},
		}),
		{
			name: 'cart',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
