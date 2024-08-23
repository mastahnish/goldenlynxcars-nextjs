import { HeaderHamburgerButton } from './header-hamburger-button';
import { HeaderLogo } from './header-logo';
import { HeaderNavigation } from './header-navigation/header-navigation';

import { ContactPhoneButton } from '@/components/common/contact-phone-button';

export const Header = () => (
	<header className="absolute inset-x-0 top-0 z-50 h-16 bg-black px-4 text-white sm:h-20 sm:bg-transparent sm:px-10">
		<div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between">
			<HeaderLogo />
			<HeaderHamburgerButton />
			<HeaderNavigation />
			<div className="hidden xl:block">
				<ContactPhoneButton />
			</div>
		</div>
	</header>
);
