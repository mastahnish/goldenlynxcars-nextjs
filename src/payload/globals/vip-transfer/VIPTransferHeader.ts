import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const VIPTransferHeader: GlobalConfig = {
	slug: 'vip-transfer-header',
	label: 'VIP Transfer Header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Oferta transferów VIP',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Transfery',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Twój pobyt w Warszawie zaczyna się od momentu wylądowania na lotnisku? Chcesz, aby ten moment był równie wyjątkowy jak reszta Twojej podróży?',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'VIP Transfer',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('vip-transfer-header')],
	},
};
