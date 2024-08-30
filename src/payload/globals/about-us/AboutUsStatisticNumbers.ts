import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const AboutUsStatisticNumbers: GlobalConfig = {
	slug: 'about-us-statistic-numbers',
	label: 'Statistic Numbers',
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
	admin: {
		group: 'About Us',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('about-us-statistic-numbers')],
	},
};
