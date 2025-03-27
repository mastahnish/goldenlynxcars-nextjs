import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const LongTermRentalHeader: GlobalConfig = {
	slug: 'long-term-rental-header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Wynajem Długoterminowy',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Wynajem',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula vel nunc ac porta. Donec ut ligula nec nunc efficitur facilisis.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'Long Term Rental',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('long-term-rental-header')],
	},
};
