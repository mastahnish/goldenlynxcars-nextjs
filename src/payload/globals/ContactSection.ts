import { checkRoles } from '../access/check-role';

import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { User } from '../payload-types';
import type { GlobalConfig } from 'payload';

export const ContactSection: GlobalConfig = {
	slug: 'contact-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Zadzwoń do nas',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Kontakt',
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
	],
	hooks: {
		afterChange: [createRevalidateGlobalHook('contact-section')],
	},
	admin: {
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
};
