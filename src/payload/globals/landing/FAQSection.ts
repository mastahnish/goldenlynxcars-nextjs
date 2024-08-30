import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const FAQSection: GlobalConfig = {
	slug: 'faq-section',
	label: 'FAQ Section',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Najczęściej Zadawane Pytania',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'FAQ',
		},
		{
			name: 'images',
			type: 'array',
			required: true,
			minRows: 2,
			maxRows: 2,
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
			],
		},
		{
			name: 'faqs',
			label: 'FAQ',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'question',
					type: 'text',
					required: true,
				},
				{
					name: 'answer',
					type: 'text',
					required: true,
				},
			],
		},
	],
	admin: {
		group: 'Landing',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('faq-section')],
	},
	typescript: {
		interface: 'FAQSection',
	},
};
