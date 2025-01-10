import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const AboutUsOverview: GlobalConfig = {
	slug: 'about-us-overview',
	label: 'Overview',
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
			defaultValue: 'Misja i Wizja',
		},
		{
			name: 'subTitle',
			type: 'text',
			required: true,
			defaultValue:
				'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
		},
	],
	admin: {
		group: 'About Us',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('about-us-overview')],
	},
};
