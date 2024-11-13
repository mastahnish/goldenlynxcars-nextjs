'use server';

import { unstable_cache } from 'next/cache';
import { z } from 'zod';

import { stripe } from './stripe';

import type Stripe from 'stripe';

export type Product = Stripe.Product & {
	default_price: Stripe.Price;
	metadata: z.infer<typeof productMetadataSchema>;
};

const productMetadataSchema = z.object({
	slug: z.string(),
	gallery: z.string(),
});

const normalizeStripeProduct = async (product: Stripe.Product) => {
	const { default_price: defaultPrice } = product;
	const { success } = productMetadataSchema.safeParse(product.metadata);

	if (!success || !defaultPrice) {
		return null;
	}

	if (typeof defaultPrice === 'object') {
		return product as unknown as Product;
	}

	const price = await stripe.prices.retrieve(defaultPrice);

	return {
		...product,
		default_price: price,
	} as unknown as Product;
};

export const getAllProducts = unstable_cache(
	async () => {
		const { data } = await stripe.products.list({ limit: 100 });
		const normalizedProducts = await Promise.all(
			data.map(normalizeStripeProduct),
		);

		return normalizedProducts.filter(product => product !== null);
	},
	[],
	{ tags: ['products'] },
);

export const getProductBySlug = unstable_cache(
	async (slug: string) => {
		const {
			data: [product],
		} = await stripe.products.search({
			query: `metadata["slug"]:"${slug}"`,
		});

		if (!product) {
			return null;
		}

		return normalizeStripeProduct(product);
	},
	[],
	{ tags: ['products'] },
);
