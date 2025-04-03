import { redirect } from 'next/navigation';

import { isFlagEnabled } from '@/lib/flags';

import type { ReactNode } from 'react';

const ShopPageLayout = async ({
	children,
}: {
	readonly children: ReactNode;
}) => {
	const isShopEnabled = await isFlagEnabled('shop');

	if (!isShopEnabled) {
		redirect('/');
	}

	return children;
};

export default ShopPageLayout;
