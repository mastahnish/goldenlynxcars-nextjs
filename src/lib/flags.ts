import { getCachedGlobal } from './get-cached-global';

import type { Flag } from '@/payload/payload-types';

type PayloadFlags = keyof Omit<Flag, 'id' | 'createdAt' | 'updatedAt'>;
export type Flags = keyof typeof mappedFlags;

const mappedFlags = {
	shop: 'isShopEnabled',
} satisfies Record<string, PayloadFlags>;

export const isFlagEnabled = async (flag: Flags) => {
	const flags = await getCachedGlobal('flags')();

	return flags[mappedFlags[flag]];
};
