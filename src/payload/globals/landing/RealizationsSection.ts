import { admins } from '@/payload/access/admin';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

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
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('realizations-section')],
	},
	access: {
		read: admins,
	},
};
