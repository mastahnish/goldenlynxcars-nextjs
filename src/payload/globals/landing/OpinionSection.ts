import { admins } from '@/payload/access/admin';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const OpinionSection: GlobalConfig = {
	slug: 'opinion-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Opinie o Golden Lynx Cars',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Opinie',
		},
		{
			name: 'opinions',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'fullName',
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
		group: 'Landing',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('opinion-section')],
	},
	access: {
		read: admins,
	},
};
