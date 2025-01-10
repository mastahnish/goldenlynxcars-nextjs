import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const AboutUsTeam: GlobalConfig = {
	slug: 'about-us-team',
	label: 'Team',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Kto stoi za Golden Lynx Cars',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Właściciele',
		},
		{
			name: 'team',
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
					name: 'firstName',
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
		group: 'About Us',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('about-us-team')],
	},
};
