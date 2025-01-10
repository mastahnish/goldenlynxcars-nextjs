import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const InvestorModelHeader: GlobalConfig = {
	slug: 'investor-model-header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Model Inwestorski',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Inwestowanie',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Dołącz do Golden Lynx Cars i zacznij zarabiać, udostępniając swój pojazd na naszej platformie.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'Investor Model',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('investor-model-header')],
	},
};
