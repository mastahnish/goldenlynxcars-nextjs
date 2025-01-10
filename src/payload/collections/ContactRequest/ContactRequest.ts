import { noone } from '../../access/noone';
import { sendContactRequestMail } from './hooks/send-contact-request-mail';

import { checkRoles } from '@/payload/access/check-role';

import type { CollectionConfig } from 'payload';

import type { User } from '@/payload/payload-types';

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
	admin: {
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	access: {
		create: noone,
		update: noone,
	},
	hooks: {
		afterOperation: [sendContactRequestMail],
	},
	defaultSort: 'date',
};
