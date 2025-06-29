import { fromZonedTime } from 'date-fns-tz';

import { calculateRentalPrice } from '@/components/rental-calculator/rental-calculator-form/utils/calculate-rental-price';

import { calculateMileageLimit } from '@/app/api/cars/[id]/rental-calculation/utils/calculate-mileage-limit';
import { TIMEZONE } from '@/lib/constants';
import { admins } from '@/payload/access/admin';
import { checkRoles } from '@/payload/access/check-role';

import type { CollectionConfig } from 'payload';

const CURRENCIES = ['PLN', 'USD', 'EUR', 'GBP', 'CHF', 'NOK', 'BTC'];

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
					name: 'rentalCurrency',
					type: 'select',
					options: CURRENCIES,
					defaultValue: 'PLN',
					required: true,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'rentalPrice',
					type: 'number',
					required: true,
					defaultValue: 0,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
					hooks: {
						beforeChange: [
							async ({ req, data, originalDoc }) => {
								if (
									data?.car === originalDoc.car &&
									data?.startDate === originalDoc.startDate &&
									data?.endDate === originalDoc.endDate
								) {
									return;
								}

								const car = await req.payload.findByID({
									collection: 'car-fleet',
									id: data?.car,
								});
								const startDate = fromZonedTime(data?.startDate, TIMEZONE);
								const endDate = fromZonedTime(data?.endDate, TIMEZONE);

								return calculateRentalPrice({ car, startDate, endDate });
							},
						],
					},
				},
				{
					name: 'depositCurrency',
					type: 'select',
					options: CURRENCIES,
					defaultValue: 'PLN',
					required: true,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'depositAmount',
					type: 'number',
					required: true,
					defaultValue: 0,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
					hooks: {
						beforeChange: [
							async ({ req, data, originalDoc }) => {
								if (data?.car === originalDoc?.car) {
									return;
								}

								const car = await req.payload.findByID({
									collection: 'car-fleet',
									id: data?.car,
								});

								return car.deposit;
							},
						],
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'installmentCurrency',
					type: 'select',
					options: CURRENCIES,
					defaultValue: 'PLN',
					required: true,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'installmentAmount',
					type: 'number',
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
				},
				{
					name: 'installmentDate',
					type: 'date',
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
					defaultValue: 0,
					access: {
						update: ({ req: { user } }) => checkRoles(user, ['admin']),
					},
					hooks: {
						beforeChange: [
							async ({ req, data, originalDoc }) => {
								if (
									data?.car === originalDoc.car &&
									data?.startDate === originalDoc.startDate &&
									data?.endDate === originalDoc.endDate
								) {
									return;
								}

								const car = await req.payload.findByID({
									collection: 'car-fleet',
									id: data?.car,
								});
								const startDate = fromZonedTime(data?.startDate, TIMEZONE);
								const endDate = fromZonedTime(data?.endDate, TIMEZONE);

								return calculateMileageLimit({ car, startDate, endDate });
							},
						],
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
			name: 'caveats',
			type: 'array',
			fields: [
				{
					name: 'content',
					type: 'text',
					required: true,
				},
			],
			admin: {
				condition: ({ status }) =>
					status === 'Confirmed' || status === 'In Progress',
			},
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
