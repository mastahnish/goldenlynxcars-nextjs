import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateCollectionHook } from '@/payload/utils/create-revalidate-collection-hook';

import type { CollectionConfig } from 'payload';

import type { User } from '@/payload/payload-types';

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
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateCollectionHook('car-fleet-types')],
	},
};
