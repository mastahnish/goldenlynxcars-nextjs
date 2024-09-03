import Link from 'next/link';

import type { NavItem } from '../header-navigation-items';

type HeaderNavigationItemProps = Readonly<NavItem>;

export const HeaderNavigationItem = ({
	href,
	label,
}: HeaderNavigationItemProps) => (
	<Link
		href={href}
		className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-width after:duration-500 hover:after:w-full"
	>
		{label}
	</Link>
);
