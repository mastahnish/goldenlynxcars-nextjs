import { toast } from 'react-hot-toast';

import { useCart } from '@/hooks/use-cart';

import type { MouseEvent } from 'react';

import type { Product } from '@/lib/shop';

interface UseShopProductListItemAddToCartButtonParams {
	product: Product;
}

export const useShopProductListItemAddToCartButton = ({
	product,
}: UseShopProductListItemAddToCartButtonParams) => {
	const { addToCart } = useCart();

	const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		addToCart(product);
		toast.success('Produkt został dodany do koszyka', {
			position: 'bottom-right',
		});
	};

	return { handleButtonClick };
};
