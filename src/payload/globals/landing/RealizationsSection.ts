import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const RealizationsSection: GlobalConfig = {
	slug: 'realizations-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Realizacje z udziałem naszych samochodów',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Realizacje',
		},
		{
			name: 'realizations',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'video',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'description',
					type: 'text',
					required: true,
				},
			],
		},
	],
	admin: {
		group: 'Landing',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('realizations-section')],
	},
};
