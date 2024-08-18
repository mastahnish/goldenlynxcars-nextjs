import type { CollectionConfig } from 'payload';

export const CarFleet: CollectionConfig = {
	slug: 'car-fleet',
	fields: [
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'price',
			type: 'number',
			required: true,
		},
		{
			name: 'details',
			type: 'group',
			fields: [
				{
					name: 'hp',
					label: 'HP',
					type: 'number',
					min: 1,
					required: true,
				},
				{
					name: 'transmission',
					type: 'select',
					required: true,
					options: [
						{ label: 'Manual', value: 'manual' },
						{ label: 'Sequential', value: 'sequential' },
						{ label: 'Automatic', value: 'automatic' },
					],
				},
				{
					name: 'seats',
					type: 'number',
					min: 1,
					required: true,
				},
				{
					name: 'fuel',
					type: 'select',
					required: true,
					options: [
						{ label: 'Gasoline', value: 'gasoline' },
						{ label: 'Diesel', value: 'diesel' },
						{ label: 'LPG', value: 'lpg' },
						{ label: 'Hybrid', value: 'hybrid' },
					],
				},
			],
		},
	],
	admin: {
		useAsTitle: 'name',
	},
};
