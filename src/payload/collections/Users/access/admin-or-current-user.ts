import { checkRoles } from '@/payload/access/check-role';

import type { Access } from 'payload';

export const adminOrCurrentUser: Access = ({ req: { user } }) => {
	if (checkRoles(user, ['admin'])) {
		return true;
	}

	if (user) {
		return {
			id: {
				equals: user.id,
			},
		};
	}

	return false;
};
