'use server';

import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';

import type { CartItem } from '@/hooks/use-cart';

export const createCheckoutSession = async (items: CartItem[]) => {
	const lineItems = items.map(({ product, amount }) => ({
		price: product.default_price.id,
		quantity: amount,
	}));
	const session = await stripe.checkout.sessions.create({
		ui_mode: 'embedded',
		line_items: lineItems,
		mode: 'payment',
		return_url: `${env.NEXT_PUBLIC_SERVER_BASE_URL}/sklep/status?sessionId={CHECKOUT_SESSION_ID}`,
	});

	return session.client_secret ?? '';
};

export const getCheckoutSession = async (sessionId: string) => {
	const { status, payment_intent } =
		await stripe.checkout.sessions.retrieve(sessionId);

	return { status, payment_intent };
};
