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
		},
		{
			name: 'additionalDriver',
			type: 'relationship',
			relationTo: 'customers',
		},
		{
			name: 'car',
			type: 'relationship',
			relationTo: 'car-fleet',
			required: true,
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
				},
				{
					name: 'depositAmount',
					type: 'number',
					required: true,
					defaultValue: 5000,
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
				},
				{
					name: 'returnAddress',
					type: 'text',
					required: true,
					defaultValue:
						'ul. Krótka 2/2, Dębgórze-Wybudowanie 84-230 (siedziba)',
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
		update: admins,
		read: ({ req }) => {
			if (checkRoles(req.user, ['admin'])) {
				return true;
			}

			return {
				status: {
					equals: 'Confirmed',
				},
			};
		},
	},
};
