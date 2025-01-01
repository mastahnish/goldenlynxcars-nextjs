import { checkRoles } from './check-role';

import type { Access } from 'payload';

export const admins: Access = ({ req: { user } }) =>
	checkRoles(user, ['admin']);
