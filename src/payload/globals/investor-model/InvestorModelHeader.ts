import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

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
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('investor-model-header')],
	},
};
