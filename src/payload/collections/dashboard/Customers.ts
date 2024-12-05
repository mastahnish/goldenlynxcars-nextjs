import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
	slug: 'customers',
	fields: [
		{
			name: 'fullName',
			type: 'text',
			required: true,
			admin: {
				hidden: true,
			},
			hooks: {
				beforeChange: [({ data }) => `${data?.personalData.fullName}`],
			},
		},
		{
			type: 'tabs',
			tabs: [
				{
					name: 'personalData',
					fields: [
						{
							name: 'fullName',
							type: 'text',
							required: true,
						},
						{
							name: 'email',
							type: 'text',
							required: true,
						},
						{
							name: 'address',
							type: 'text',
							required: true,
						},
						{
							name: 'pesel',
							label: 'PESEL',
							type: 'text',
							required: true,
						},
						{
							name: 'idNumber',
							label: 'ID Number',
							type: 'text',
							required: true,
						},
					],
				},
				{
					name: 'drivingLicense',
					fields: [
						{
							name: 'number',
							type: 'text',
							required: true,
						},
						{
							name: 'blankNumber',
							type: 'text',
							required: true,
						},
						{
							name: 'issueDate',
							type: 'date',
							required: true,
						},
						{
							name: 'expirationDate',
							type: 'date',
							required: true,
						},
						{
							name: 'issuingAuthority',
							type: 'text',
							required: true,
						},
					],
				},
				{
					name: 'invoiceDetails',
					fields: [
						{
							name: 'companyName',
							type: 'text',
						},
						{
							name: 'NIP',
							label: 'NIP',
							type: 'text',
						},
						{
							name: 'address',
							type: 'text',
						},
					],
				},
			],
		},
	],
	admin: {
		group: 'Dashboard',
		useAsTitle: 'fullName',
	},
};
