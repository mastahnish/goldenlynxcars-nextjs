import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
	slug: 'customers',
	fields: [
		{
			name: 'email',
			type: 'text',
			required: true,
			admin: {
				hidden: true,
			},
			hooks: {
				beforeChange: [({ data }) => `${data?.personalData.email}`],
			},
		},
		{
			type: 'tabs',
			tabs: [
				{
					name: 'personalData',
					fields: [
						{
							name: 'email',
							type: 'text',
							required: true,
						},
						{
							name: 'gender',
							type: 'select',
							options: ['Male', 'Female'],
							required: true,
						},
						{
							name: 'fullName',
							type: 'text',
						},
						{
							name: 'phoneNumber',
							type: 'text',
						},
						{
							name: 'address',
							type: 'text',
						},
						{
							name: 'pesel',
							label: 'PESEL',
							type: 'text',
						},
						{
							name: 'idNumber',
							label: 'ID Number',
							type: 'text',
						},
					],
				},
				{
					name: 'drivingLicense',
					fields: [
						{
							name: 'number',
							type: 'text',
						},
						{
							name: 'blankNumber',
							type: 'text',
						},
						{
							name: 'issueDate',
							type: 'date',
						},
						{
							name: 'expirationDate',
							type: 'date',
						},
						{
							name: 'issuingAuthority',
							type: 'text',
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
		useAsTitle: 'email',
	},
};
