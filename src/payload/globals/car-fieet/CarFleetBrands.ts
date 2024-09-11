import { createRevalidateCollectionHook } from '@/payload/utils/create-revalidate-collection-hook';

import type { CollectionConfig } from 'payload';

export const CarFleetBrands: CollectionConfig = {
	slug: 'car-fleet-brands',
	timestamps: false,
	fields: [
		{
			name: 'brand',
			type: 'text',
			required: true,
		},
	],
	admin: {
		group: 'Car Fleet',
		useAsTitle: 'brand',
	},
	hooks: {
		afterChange: [createRevalidateCollectionHook('car-fleet-brands')],
	},
};
