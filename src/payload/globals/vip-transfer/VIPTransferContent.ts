import { admins } from '@/payload/access/admin';
import { createRevalidateGlobalHook } from '@/payload/utils/create-revalidate-global-hook';

import type { GlobalConfig } from 'payload';

export const VIPTransferContent: GlobalConfig = {
	slug: 'vip-transfer-content',
	label: 'VIP Transfer Content',
	fields: [
		{
			name: 'serviceDescription',
			type: 'group',
			fields: [
				{
					name: 'media',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'title',
					type: 'text',
					required: true,
					defaultValue: 'Opis usługi',
				},
				{
					name: 'content',
					type: 'textarea',
					required: true,
					defaultValue:
						'Dysponujemy szerokim wyborem ekskluzywnych samochodów, które spełnią najbardziej wymagające oczekiwania. Bez względu na to, czy potrzebujesz eleganckiej limuzyny czy szybkiego sportowego auta, mamy odpowiedni pojazd, który podkreśli Twój styl i nadaje się do Twoich potrzeb.',
				},
			],
		},
		{
			name: 'whyWorth',
			type: 'group',
			fields: [
				{
					name: 'title',
					type: 'text',
					defaultValue: 'Dlaczego warto?',
					required: true,
				},
				{
					name: 'description',
					type: 'text',
					defaultValue:
						'Dysponujemy szerokim wyborem ekskluzywnych samochodów, które spełnią najbardziej wymagające oczekiwania:',
					required: true,
				},
				{
					name: 'needments',
					type: 'array',
					required: true,
					fields: [
						{
							name: 'content',
							type: 'text',
							required: true,
						},
					],
				},
			],
		},
		{
			name: 'process',
			type: 'group',
			fields: [
				{
					name: 'media',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'title',
					type: 'text',
					required: true,
					defaultValue: 'Jak wygląda proces?',
				},
				{
					name: 'content',
					type: 'textarea',
					required: true,
					defaultValue:
						'Dysponujemy szerokim wyborem ekskluzywnych samochodów, które spełnią najbardziej wymagające oczekiwania. Bez względu na to, czy potrzebujesz eleganckiej limuzyny czy szybkiego sportowego auta, mamy odpowiedni pojazd, który podkreśli Twój styl i nadaje się do Twoich potrzeb.',
				},
			],
		},
	],
	admin: {
		group: 'VIP Transfer',
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('vip-transfer-content')],
	},
	access: {
		read: admins,
	},
};
