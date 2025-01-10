import { checkRoles } from '../access/check-role';

import type { User } from '../payload-types';
import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
	slug: 'media',
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
	],
	admin: {
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	access: {
		read: () => true,
	},
	upload: true,
};
