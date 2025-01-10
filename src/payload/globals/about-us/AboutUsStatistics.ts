import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const AboutUsStatistics: GlobalConfig = {
	slug: 'about-us-statistics',
	label: 'Statistics',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Nasza firma w liczbach',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Budujemy Zaufanie',
		},
		{
			name: 'statistics',
			type: 'group',
			fields: [
				{
					name: 'clients',
					type: 'number',
					required: true,
					defaultValue: 142,
				},
				{
					name: 'kilometers',
					type: 'number',
					required: true,
					defaultValue: 780,
				},
			],
		},
	],
	admin: {
		group: 'About Us',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('about-us-statistics')],
	},
};
