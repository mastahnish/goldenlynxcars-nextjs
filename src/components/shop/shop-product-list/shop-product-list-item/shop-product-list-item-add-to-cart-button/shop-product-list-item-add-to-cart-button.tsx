'use client';

import { useShopProductListItemAddToCartButton } from './use-shop-product-list-item-add-to-cart-button';

import { Button } from '@/components/ui/button/button';
import { ShoppingCart } from '@/components/ui/icons';

import type { Product } from '@/lib/shop';

type ShopProductListItemAddToCartButtonProps = Readonly<{
	product: Product;
}>;

export const ShopProductListItemAddToCartButton = ({
	product,
}: ShopProductListItemAddToCartButtonProps) => {
	const { handleButtonClick } = useShopProductListItemAddToCartButton({
		product,
	});

	return (
		<Button
			size="small"
			color="white"
			icon={ShoppingCart}
			onClick={handleButtonClick}
			fullWidth
		>
			Dodaj do koszyka
		</Button>
	);
};
