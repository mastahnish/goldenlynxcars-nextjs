import Link from 'next/link';

import type { NavItem } from '../../header-navigation-items';

type HeaderMobileNavigationItemProps = Readonly<{
	item: NavItem;
	onClick: () => void;
}>;

export const HeaderMobileNavigationItem = ({
	item: { href, label },
	onClick,
}: HeaderMobileNavigationItemProps) => (
	<Link
		href={href}
		onClick={onClick}
		className="text-lg uppercase text-white transition-colors duration-300 hover:text-neutral-300 sm:text-xl"
	>
		{label}
	</Link>
);
