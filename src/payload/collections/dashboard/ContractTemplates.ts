import type { CollectionConfig } from 'payload';

export const ContractTemplates: CollectionConfig = {
	slug: 'contract-templates',
	fields: [
		{
			name: 'generate',
			type: 'ui',
			admin: {
				components: {
					Field: {
						path: '@/payload/components/dashboard/generate-contract-button/generate-contract-button',
					},
				},
			},
		},
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'template',
			type: 'code',
			required: true,
			admin: {
				language: 'html',
				editorOptions: {
					wordWrap: 'off',
					wordWrapOverride1: 'off',
					wordWrapOverride2: 'off',
				},
			},
		},
	],
	admin: {
		group: 'Dashboard',
		useAsTitle: 'name',
	},
};
