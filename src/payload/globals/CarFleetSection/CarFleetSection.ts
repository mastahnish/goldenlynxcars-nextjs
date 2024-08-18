import { revalidateCarFleetSection } from './hooks/revalidate-car-fleet-section';

import type { GlobalConfig } from 'payload';

export const CarFleetSection: GlobalConfig = {
	slug: 'car-fleet-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Flota samochodów',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Samochody',
		},
		{
			name: 'cars',
			type: 'relationship',
			relationTo: 'car-fleet',
			required: true,
			hasMany: true,
			maxRows: 3,
		},
	],
	admin: {
		group: 'Landing',
	},
	hooks: {
		afterChange: [revalidateCarFleetSection],
	},
};
