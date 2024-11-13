import { toast } from 'react-hot-toast';

import { useCart } from '@/hooks/use-cart';

import type { Product } from '@/lib/shop';

interface UseShoppingCartDrawerProductListItemSummaryParams {
	product: Product;
}

export const useShoppingCartDrawerProductListItemSummary = ({
	product,
}: UseShoppingCartDrawerProductListItemSummaryParams) => {
	const { deleteFromCart } = useCart();

	const handleDeleteFromCart = () => {
		deleteFromCart(product);
		toast.success('Produkt został usunięty z koszyka', {
			position: 'bottom-right',
		});
	};

	return { handleDeleteFromCart };
};
