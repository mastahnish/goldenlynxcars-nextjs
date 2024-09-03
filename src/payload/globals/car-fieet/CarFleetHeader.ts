import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const CarFleetHeader: GlobalConfig = {
	slug: 'car-fleet-header',
	label: 'Header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Flota Samochodów',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Samochody',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'W Golden Lynx cars cenimy zaufanie - dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'Car Fleet',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('car-fleet-header')],
	},
};
