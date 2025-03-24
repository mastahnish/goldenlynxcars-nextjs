import { checkRoles } from '../../access/check-role';
import { createRevalidateGlobalHook } from '../../utils/create-revalidate-global-hook';

import type { User } from '../../payload-types';
import type { GlobalConfig } from 'payload';

export const ContactHeader: GlobalConfig = {
	slug: 'contact-header',
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
			defaultValue: 'Kontakt',
		},
		{
			name: 'label',
			type: 'text',
			defaultValue: 'Kontakt',
		},
		{
			name: 'content',
			type: 'text',
			required: true,
			defaultValue:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac purus turpis. Maecenas vel rutrum ligula, ut tincidunt magna.',
		},
		{
			name: 'subContent',
			type: 'text',
		},
	],
	admin: {
		group: 'Contact',
		hidden: ({ user }) => !checkRoles(user as unknown as User, ['admin']),
	},
	hooks: {
		afterChange: [createRevalidateGlobalHook('contact-header')],
	},
};
