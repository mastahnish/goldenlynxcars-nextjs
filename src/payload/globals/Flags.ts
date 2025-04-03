import { checkRoles } from '../access/check-role';
import { createRevalidateGlobalHook } from '../utils/create-revalidate-global-hook';

import type { User } from '../payload-types';
import type { GlobalConfig } from 'payload';

export const Flags: GlobalConfig = {
	slug: 'flags',
	fields: [
		{
			name: 'isShopEnabled',
			type: 'checkbox',
			label: 'Shop enabled',
			defaultValue: true,
			required: true,
		},
	],
	hooks: {
		afterChange: [createRevalidateGlobalHook('flags')],
	},
	admin: {
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
};
