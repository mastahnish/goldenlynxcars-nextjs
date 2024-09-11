import { createRevalidateCollectionHook } from '@/payload/utils/create-revalidate-collection-hook';

import type { CollectionConfig } from 'payload';

export const CarFleetTypes: CollectionConfig = {
	slug: 'car-fleet-types',
	timestamps: false,
	fields: [
		{
			name: 'type',
			type: 'text',
			required: true,
		},
	],
	admin: {
		group: 'Car Fleet',
		useAsTitle: 'type',
	},
	hooks: {
		afterChange: [createRevalidateCollectionHook('car-fleet-types')],
	},
};
