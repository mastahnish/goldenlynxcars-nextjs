import type { GlobalConfig } from 'payload';

export const ContractSettings: GlobalConfig = {
	slug: 'contract-settings',
	fields: [
		{
			type: 'row',
			fields: [
				{
					name: 'vehiclePickUp',
					type: 'relationship',
					required: true,
					relationTo: 'contract-templates',
				},
				{
					name: 'generateVehiclePickUp',
					type: 'ui',
					admin: {
						components: {
							Field: {
								path: '@/payload/components/dashboard/generate-contract-button/generate-contract-button',
								clientProps: {
									contractName: 'vehiclePickUp',
								},
							},
						},
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'vehicleRelease',
					type: 'relationship',
					required: true,
					relationTo: 'contract-templates',
				},
				{
					name: 'generateVehicleRelease',
					type: 'ui',
					admin: {
						components: {
							Field: {
								path: '@/payload/components/dashboard/generate-contract-button/generate-contract-button',
								clientProps: {
									contractName: 'vehicleRelease',
								},
							},
						},
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'vehicleRental',
					type: 'relationship',
					required: true,
					relationTo: 'contract-templates',
				},
				{
					name: 'generateVehicleRental',
					type: 'ui',
					admin: {
						components: {
							Field: {
								path: '@/payload/components/dashboard/generate-contract-button/generate-contract-button',
								clientProps: {
									contractName: 'vehicleRental',
								},
							},
						},
					},
				},
			],
		},
		{
			type: 'row',
			fields: [
				{
					name: 'vehicleRentalAuthorized',
					type: 'relationship',
					required: true,
					relationTo: 'contract-templates',
				},
				{
					name: 'generateVehicleRentalAuthorized',
					type: 'ui',
					admin: {
						components: {
							Field: {
								path: '@/payload/components/dashboard/generate-contract-button/generate-contract-button',
								clientProps: {
									contractName: 'vehicleRentalAuthorized',
								},
							},
						},
					},
				},
			],
		},
		{
			name: 'layout',
			type: 'group',
			fields: [
				{
					name: 'header',
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
				{
					name: 'footer',
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
		},
	],
	admin: {
		group: 'Dashboard',
	},
};
