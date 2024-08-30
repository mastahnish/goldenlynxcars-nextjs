import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const ContactSection: GlobalConfig = {
	slug: 'contact-section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Zadzwoń do nas',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Kontakt',
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
	],
	admin: {
		group: 'Landing',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('contact-section')],
	},
};
