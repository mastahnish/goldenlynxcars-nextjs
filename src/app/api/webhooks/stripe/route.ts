import { revalidateTag } from 'next/cache';

import { env } from '@/lib/env';
import { stripe } from '@/lib/stripe';

export const POST = async (request: Request) => {
	try {
		const text = await request.text();
		const signature = request.headers.get('stripe-signature');

		const event = stripe.webhooks.constructEvent(
			text,
			signature ?? '',
			env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
		);

		switch (event.type) {
			case 'product.created':
			case 'product.updated':
			case 'product.deleted':
				revalidateTag('products');
				break;
		}
	} catch (err) {
		const message = err instanceof Error ? err.message : err;

		return new Response(`Webhook error: ${message}`, {
			status: 400,
		});
	}

	return new Response('Success!', {
		status: 200,
	});
};
