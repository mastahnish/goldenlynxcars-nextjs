import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const Hero: GlobalConfig = {
	slug: 'hero',
	fields: [
		{
			name: 'title',
			type: 'group',
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'firstPart',
							type: 'text',
							required: true,
							defaultValue: 'Zmień',
						},
						{
							name: 'secondPart',
							type: 'text',
							required: true,
							defaultValue: 'Perspektywę',
						},
					],
				},
			],
		},
		{
			name: 'description',
			type: 'text',
			required: true,
			defaultValue:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis justo at consequat finibus. Sed sit amet tempor neque.',
		},
	],
	admin: {
		group: 'Landing',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('hero')],
	},
};
