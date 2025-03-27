import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const LongTermRentalContent: GlobalConfig = {
	slug: 'long-term-rental-content',
	fields: [
		{
			name: 'process',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'label',
					type: 'text',
				},
				{
					name: 'steps',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'content',
							type: 'text',
							required: true,
						},
					],
				},
			],
		},
		{
			name: 'additionalInformation',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'label',
					type: 'text',
				},
				{
					name: 'informations',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'content',
							type: 'text',
							required: true,
						},
					],
				},
			],
		},
		{
			name: 'summary',
			type: 'text',
			required: true,
		},
	],
	admin: {
		group: 'Long Term Rental',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('long-term-rental-content')],
	},
};
