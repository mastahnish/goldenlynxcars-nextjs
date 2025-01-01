import type { User } from '../payload-types';

export const checkRoles = (user: User | null, roles: User['roles']) => {
	if (!user) {
		return false;
	}

	return roles.some(role => user.roles.some(userRole => userRole === role));
};
