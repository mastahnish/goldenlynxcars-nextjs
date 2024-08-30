import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const AboutUsHeader: GlobalConfig = {
	slug: 'about-us-header',
	label: 'Header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'O Golden Lynx Cars',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'O Firmie',
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
			defaultValue:
				'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
		},
	],
	admin: {
		group: 'About Us',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('about-us-header')],
	},
};
