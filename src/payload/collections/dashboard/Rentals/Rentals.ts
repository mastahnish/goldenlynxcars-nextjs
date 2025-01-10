import { admins } from '@/payload/access/admin';
import { checkRoles } from '@/payload/access/check-role';

import type { CollectionConfig } from 'payload';

export const Rentals: CollectionConfig = {
	slug: 'rentals',
	fields: [
		{
			name: 'customer',
			type: 'relationship',
			relationTo: 'customers',
			required: true,
			access: {
				update: ({ req: { user } }) => checkRoles(user, ['admin']),
			},
		},
		{
			name: 'additionalDriver',
			type: 'relationship',
			relationTo: 'customers',
			access: {
				update: ({ req: { user } }) => checkRoles(user, ['admin']),
			},
		},
		{
			name: 'car',
			type: 'relationship',
			relationTo: 'car-fleet',
			required: true,
			access: {
				update: ({ req: { user } }) => checkRoles(user, ['admin']),
			},
		},
		{
			type: 'row',
			fields: [
				{
					name: 'startDate',
					type: 'date',
					required: true,
					admin: {
						date: {
							pickerAppearance: 'dayAndTime',
						},
					},
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'endDate',
					type: 'date',
					required: true,
					admin: {
						date: {
							pickerAppearance: 'dayAndTime',
						},
					},
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'rentalPrice',
					type: 'number',
					required: true,
					defaultValue: 1480,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'depositAmount',
					type: 'number',
					required: true,
					defaultValue: 5000,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'pickUpAddress',
					label: 'Pick-Up Address',
					type: 'text',
					required: true,
					defaultValue:
						'ul. Krótka 2/2, Dębgórze-Wybudowanie 84-230 (siedziba)',
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'returnAddress',
					type: 'text',
					required: true,
					defaultValue:
						'ul. Krótka 2/2, Dębgórze-Wybudowanie 84-230 (siedziba)',
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'mileageLimit',
					type: 'number',
					required: true,
					defaultValue: 500,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'mileageBefore',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'mileageAfter',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'status',
					type: 'select',
					required: true,
					options: [
						'Provisional',
						'Offer Sent',
						'Confirmed',
						'In Progress',
						'Completed',
						'Rejected',
					],
					defaultValue: 'Provisional',
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'statusAction',
					type: 'ui',
					admin: {
						components: {
							Field:
								'@/payload/collections/dashboard/Rentals/ui/status-action-button/status-action-button',
						},
					},
				},
			],
		},
		{
			name: 'state',
			type: 'ui',
			admin: {
				components: {
					Field:
						'@/payload/collections/dashboard/Rentals/ui/rental-state-field/rental-state-field',
				},
			},
		},
		{
			name: 'add-customer-signature',
			type: 'ui',
			admin: {
				components: {
					Field: {
						path: '@/payload/collections/dashboard/Rentals/ui/add-signature-button/add-signature-button',
						clientProps: {
							target: 'customer',
						},
					},
				},
			},
		},
		{
			name: 'add-employee-signature',
			type: 'ui',
			admin: {
				components: {
					Field: {
						path: '@/payload/collections/dashboard/Rentals/ui/add-signature-button/add-signature-button',
						clientProps: {
							target: 'employee',
						},
					},
				},
			},
		},
		{
			name: 'customerSignatureJSON',
			type: 'json',
			admin: {
				hidden: true,
			},
		},
		{
			name: 'employeeSignatureJSON',
			type: 'json',
			admin: {
				hidden: true,
			},
		},
	],
	admin: {
		group: 'Dashboard',
		defaultColumns: ['id', 'customer', 'car', 'status'],
	},
	access: {
		create: admins,
		delete: admins,
		read: ({ req }) => {
			if (checkRoles(req.user, ['admin'])) {
				return true;
			}

			return {
				status: {
					in: 'Confirmed,In Progress',
				},
			};
		},
	},
};
