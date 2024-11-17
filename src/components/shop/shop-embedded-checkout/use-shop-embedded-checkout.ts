import { useCart } from '@/hooks/use-cart';
import { useCreateCheckoutSession } from '@/hooks/use-create-checkout-session';

export const useShopEmbeddedCheckout = () => {
	const { createCheckoutSession } = useCreateCheckoutSession();
	const { isLoading, cartItems, clearCart } = useCart();

	const fetchClientSecret = () => createCheckoutSession(cartItems);

	return { isLoading, fetchClientSecret, clearCart };
};
