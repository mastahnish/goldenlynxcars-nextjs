import { calculateTotalPrice } from './shopping-cart-summary.utils';
import { ShoppingCartSummaryPayButton } from './shopping-cart-summary-pay-button';

import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/utils/shop.utils';

export const ShoppingCartSummary = () => {
	const { cartItems } = useCart();

	const price = calculateTotalPrice(cartItems);

	return (
		<div className="mt-auto shrink-0 space-y-8 border-t border-neutral-600 p-5">
			<div className="flex items-center justify-between text-lg">
				<p>Podsumowanie</p>
				<p className="text-lg">{formatPrice(price)} zł</p>
			</div>
			<ShoppingCartSummaryPayButton />
		</div>
	);
};
