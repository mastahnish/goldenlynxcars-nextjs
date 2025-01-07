import { adminOrCurrentUser } from './access/admin-or-current-user';

import { checkRoles } from '@/payload/access/check-role';

import type { CollectionConfig } from 'payload';

import type { User } from '@/payload/payload-types';

export const Users: CollectionConfig = {
	slug: 'users',
	auth: true,
	fields: [
		{
			name: 'fullName',
			type: 'text',
			required: true,
		},
		{
			name: 'phoneNumber',
			type: 'text',
			required: true,
		},
		{
			name: 'roles',
			type: 'select',
			options: [
				{ label: 'Employee', value: 'employee' },
				{ label: 'Admin', value: 'admin' },
			],
			hasMany: true,
			required: true,
			access: {
				read: ({ req: { user } }) => checkRoles(user, ['admin']),
				update: ({ req: { user } }) => checkRoles(user, ['admin']),
			},
		},
	],
	admin: {
		useAsTitle: 'email',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	access: {
		create: adminOrCurrentUser,
		delete: adminOrCurrentUser,
		update: adminOrCurrentUser,
	},
};
