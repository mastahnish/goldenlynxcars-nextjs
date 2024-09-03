import { createPortal } from 'react-dom';

import { navItems } from '../../header-navigation-items';
import { HeaderMobileNavigationItem } from './header-mobile-navigation-item';

type HeaderMobileNavigationProps = Readonly<{
	close: () => void;
}>;

export const HeaderMobileNavigation = ({
	close,
}: HeaderMobileNavigationProps) =>
	createPortal(
		<nav className="fixed inset-0 z-100 flex justify-center overflow-y-auto bg-semi-black py-8 lg:hidden">
			<ul className="my-auto flex flex-col items-center gap-8">
				{navItems.map(item => (
					<li key={item.label}>
						<HeaderMobileNavigationItem item={item} onClick={close} />
					</li>
				))}
			</ul>
		</nav>,
		document.body,
	);
