import type Stripe from 'stripe';

export const formatPrice = (price: number | null) => (price ?? 0) / 100;

export const getPaymentId = (intent: string | Stripe.PaymentIntent) => {
	const id = typeof intent === 'string' ? intent : intent.id;

	return id.split('_')[1] ?? '';
};
