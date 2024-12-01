import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

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
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('investor-model-content')],
	},
};
