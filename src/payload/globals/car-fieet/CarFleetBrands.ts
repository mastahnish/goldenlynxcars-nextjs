import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateCollectionHook } from '@/payload/utils/create-revalidate-collection-hook';

import type { CollectionConfig } from 'payload';

import type { User } from '@/payload/payload-types';

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
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateCollectionHook('car-fleet-brands')],
	},
};
