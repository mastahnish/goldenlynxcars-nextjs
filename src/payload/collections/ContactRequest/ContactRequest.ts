import { noone } from '../../access/noone';
import { sendContactRequestMail } from './hooks/send-contact-request-mail';

import { admins } from '@/payload/access/admin';

import type { CollectionConfig } from 'payload';

export const ContactRequest: CollectionConfig = {
	slug: 'contact-request',
	fields: [
		{
			name: 'email',
			type: 'text',
			required: true,
		},
		{
			name: 'firstName',
			type: 'text',
			required: true,
		},
		{
			name: 'phoneNumber',
			type: 'text',
			required: true,
		},
		{
			name: 'car',
			type: 'relationship',
			relationTo: 'car-fleet',
			required: true,
		},
		{
			name: 'date',
			type: 'date',
			required: true,
		},
	],
	access: {
		create: noone,
		read: admins,
		update: noone,
	},
	hooks: {
		afterOperation: [sendContactRequestMail],
	},
	defaultSort: 'date',
};
