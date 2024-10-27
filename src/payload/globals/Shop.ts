import { createRevalidateGlobalHook } from '../utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const Shop: GlobalConfig = {
	slug: 'shop',
	fields: [
		{
			name: 'header',
			type: 'group',
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
		},
		{
			name: 'products',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'thumbnail',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'slug',
					type: 'text',
					required: true,
				},
				{
					name: 'name',
					type: 'text',
					required: true,
				},
				{
					name: 'description',
					type: 'textarea',
					required: true,
					defaultValue:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed gravida lorem. Donec quis mollis purus, nec suscipit metus. Suspendisse pulvinar velit augue, quis tristique lacus finibus ac. Etiam justo leo, efficitur quis tempor condimentum, ultricies eget diam.',
				},
				{
					name: 'price',
					type: 'number',
					required: true,
				},
				{
					name: 'gallery',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'image',
							type: 'upload',
							relationTo: 'media',
							required: true,
						},
					],
				},
			],
		},
	],
	hooks: {
		afterChange: [createRevalidateGlobalHook('shop')],
	},
};
