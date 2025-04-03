import { navItems } from '../header-navigation-items';
import { HeaderNavigationItem } from './header-navigation-item';

export const HeaderNavigation = () => (
	<nav className="hidden lg:block">
		<ul className="flex gap-8 xl:gap-12 2xl:gap-16">
			{navItems.map(item => (
				<HeaderNavigationItem key={item.label} item={item} />
			))}
		</ul>
	</nav>
);
