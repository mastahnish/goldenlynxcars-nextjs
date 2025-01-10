import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const CarFleetSection: GlobalConfig = {
	slug: 'car-fleet-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Flota samochodów',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Samochody',
		},
		{
			name: 'cars',
			type: 'relationship',
			relationTo: 'car-fleet',
			required: true,
			hasMany: true,
		},
	],
	admin: {
		group: 'Landing',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('car-fleet-section')],
	},
};
