import { revalidateServicesSection } from './hooks/revalidate-services-section';

import type { GlobalConfig } from 'payload';

export const ServicesSection: GlobalConfig = {
	slug: 'services-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Nasze usługi',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Usługi',
		},
		{
			name: 'services',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'content',
					type: 'text',
					required: true,
				},
				{
					name: 'isNew',
					type: 'checkbox',
					required: true,
				},
			],
		},
	],
	admin: {
		group: 'Landing',
	},
	hooks: {
		afterChange: [revalidateServicesSection],
	},
};
