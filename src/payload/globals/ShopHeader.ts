import { checkRoles } from '../access/check-role';
import { createRevalidateGlobalHook } from '../utils/create-revalidate-global-hook';

import type { User } from '../payload-types';
import type { GlobalConfig } from 'payload';

export const ShopHeader: GlobalConfig = {
	slug: 'shop-header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Nasz Merch',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Merch',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	hooks: {
		afterChange: [createRevalidateGlobalHook('shop-header')],
	},
	admin: {
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
};
