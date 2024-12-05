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
				},
				{
					name: 'endDate',
					type: 'date',
					required: true,
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
				},
				{
					name: 'depositAmount',
					type: 'number',
					required: true,
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'mileageBefore',
					type: 'number',
					required: true,
				},
				{
					name: 'mileageAfter',
					type: 'number',
					required: true,
				},
			],
		},
		{
			type: 'ui',
			name: 'status',
			admin: {
				components: {
					Field:
						'@/payload/collections/dashboard/Rentals/ui/rental-status-field/rental-status-field#RentalStatusField',
				},
			},
		},
	],
	admin: {
		group: 'Dashboard',
	},
};
