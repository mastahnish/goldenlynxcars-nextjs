'use client';

import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useShopEmbeddedCheckout } from './use-shop-embedded-checkout';

import { env } from '@/lib/env';

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export const ShopEmbeddedCheckout = () => {
	const { isLoading, fetchClientSecret } = useShopEmbeddedCheckout();

	if (isLoading) {
		return null;
	}

	return (
		<EmbeddedCheckoutProvider
			stripe={stripePromise}
			options={{
				fetchClientSecret,
			}}
		>
			<EmbeddedCheckout />
		</EmbeddedCheckoutProvider>
	);
};
