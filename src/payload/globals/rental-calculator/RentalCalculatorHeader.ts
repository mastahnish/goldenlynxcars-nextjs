import { checkRoles } from '@/payload/access/check-role';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const RentalCalculatorHeader: GlobalConfig = {
	slug: 'rental-calculator-header',
	label: 'Header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Kalkulator Najmu',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Wycena',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Jeśli zastanawiasz się ile zapłacisz za wynajem u nas tp  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'Rental Calculator',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('rental-calculator-header')],
	},
};
