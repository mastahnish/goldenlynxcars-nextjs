import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const InvestorModelContent: GlobalConfig = {
	slug: 'investor-model-content',
	fields: [
		{
			name: 'media',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'description',
			type: 'text',
			required: true,
		},
		{
			name: 'steps',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'content',
					type: 'text',
					required: true,
				},
			],
		},
	],
	admin: {
		group: 'Investor Model',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('investor-model-content')],
	},
};
