import { createRevalidateCollectionHook } from '@/payload/utils/create-revalidate-collection-hook';

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
			name: 'slug',
			type: 'text',
			required: true,
		},
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
			defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		},
		{
			name: 'brand',
			type: 'relationship',
			relationTo: 'car-fleet-brands',
			required: true,
			hasMany: false,
		},
		{
			name: 'type',
			type: 'relationship',
			relationTo: 'car-fleet-types',
			required: true,
			hasMany: false,
		},
		{
			name: 'deposit',
			type: 'number',
			required: true,
			defaultValue: 0,
		},
		{
			name: 'additionalMileagePrice',
			type: 'number',
			required: true,
			defaultValue: 0,
		},
		{
			name: 'contract',
			type: 'group',
			fields: [
				{
					name: 'registrationNumber',
					type: 'text',
				},
				{
					name: 'registrationCertificateNumber',
					type: 'text',
				},
				{
					name: 'VIN',
					label: 'VIN',
					type: 'text',
				},
				{
					name: 'oc',
					label: 'OC',
					type: 'text',
				},
				{
					name: 'keysAmount',
					type: 'number',
					defaultValue: 1,
					required: true,
				},
				{
					name: 'tires',
					type: 'text',
				},
				{
					name: 'accessories',
					type: 'text',
				},
			],
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
		{
			name: 'media',
			type: 'group',
			fields: [
				{
					name: 'info',
					type: 'upload',
					relationTo: 'media',
				},
				{
					name: 'rentalPrice',
					type: 'upload',
					relationTo: 'media',
				},
				{
					name: 'gallery',
					type: 'array',
					fields: [
						{
							name: 'image',
							type: 'upload',
							relationTo: 'media',
						},
					],
				},
			],
		},
		{
			name: 'prices',
			type: 'group',
			fields: [
				{
					name: 'd_1_2',
					label: '1-2 days',
					type: 'number',
					required: true,
				},
				{
					name: 'd_3_6',
					label: '3-6 days',
					type: 'number',
					required: true,
				},
				{
					name: 'd_7_13',
					label: '7-13 days',
					type: 'number',
					required: true,
				},
				{
					name: 'd_14_20',
					label: '14-20 days',
					type: 'number',
					required: true,
				},
				{
					name: 'd_21_30',
					label: '21-30 days',
					type: 'number',
					required: true,
				},
				{
					name: 'm_1',
					label: '1 month+',
					type: 'number',
					required: true,
				},
				{
					name: 'm_3',
					label: '3 months+',
					type: 'number',
					required: true,
				},
			],
		},
		{
			name: 'mileageLimits',
			type: 'group',
			fields: [
				{
					name: 'd_1_2',
					label: '1-2 days',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'd_3_6',
					label: '3-6 days',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'd_7_13',
					label: '7-13 days',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'd_14_20',
					label: '14-20 days',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'd_21_30',
					label: '21-30 days',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'm_1',
					label: '1 month+',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
				{
					name: 'm_3',
					label: '3 months+',
					type: 'number',
					required: true,
					defaultValue: 0,
				},
			],
		},
	],
	admin: {
		useAsTitle: 'name',
		group: 'Car Fleet',
	},
	hooks: {
		afterChange: [createRevalidateCollectionHook('car-fleet')],
	},
};
