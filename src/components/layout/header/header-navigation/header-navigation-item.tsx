import Link from 'next/link';

import { isFlagEnabled } from '@/lib/flags';

import type { NavItem } from '../header-navigation-items';

type HeaderNavigationItemProps = Readonly<{
	item: NavItem;
}>;

export const HeaderNavigationItem = async ({
	item: { href, label, flag },
}: HeaderNavigationItemProps) => {
	const isEnabled = !flag || (await isFlagEnabled(flag));

	if (!isEnabled) {
		return null;
	}

	return (
		<li>
			<Link
				href={href}
				className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-width after:duration-500 hover:after:w-full"
			>
				{label}
			</Link>
		</li>
	);
};
