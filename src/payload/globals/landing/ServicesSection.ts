import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const ServicesSection: GlobalConfig = {
	slug: 'services-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Nasze usługi',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Usługi',
		},
		{
			name: 'reelSection',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					defaultValue: 'Obejrzyj REEL',
				},
				{
					name: 'label',
					type: 'text',
					defaultValue: 'REEL',
				},
				{
					name: 'video',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'isHidden',
					type: 'checkbox',
					required: true,
				},
			],
		},
		{
			name: 'services',
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
				{
					name: 'href',
					type: 'text',
					required: true,
				},
				{
					name: 'isNew',
					type: 'checkbox',
					required: true,
				},
			],
		},
	],
	admin: {
		group: 'Landing',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('services-section')],
	},
};
