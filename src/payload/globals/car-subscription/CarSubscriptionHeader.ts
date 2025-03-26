import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const CarSubscriptionHeader: GlobalConfig = {
	slug: 'car-subscription-header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Subskrypcja Samochodowa',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Subskrypcja',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula vel nunc ac porta. Donec ut ligula nec nunc efficitur facilisis.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'Car Subscription',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('car-subscription-header')],
	},
};
