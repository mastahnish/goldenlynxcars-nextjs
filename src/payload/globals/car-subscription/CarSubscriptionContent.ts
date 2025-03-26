import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const CarSubscriptionContent: GlobalConfig = {
	slug: 'car-subscription-content',
	fields: [
		{
			name: 'description',
			type: 'text',
			required: true,
		},
		{
			name: 'benefits',
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
					required: true,
				},
				{
					name: 'list',
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
			name: 'comparisonTable',
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
					required: true,
				},
				{
					name: 'categories',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'category',
							type: 'text',
							required: true,
						},
					],
				},
				{
					name: 'contents',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'parameter',
							type: 'text',
							required: true,
						},
						{
							name: 'content',
							type: 'array',
							required: true,
							fields: [
								{
									name: 'item',
									type: 'text',
									required: true,
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'chooseReasons',
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
					required: true,
				},
				{
					name: 'list',
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
		group: 'Car Subscription',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('car-subscription-content')],
	},
};
