import { HeaderLogo } from './header-logo';
import { HeaderMobileNavigationButton } from './header-mobile-navigation-button/header-mobile-navigation-button';
import { HeaderNavigation } from './header-navigation/header-navigation';
import { HeaderShoppingCart } from './header-shopping-cart/header-shopping-cart';

import { ContactPhoneButton } from '@/components/common/contact-phone-button';

import { PHONE_NUMBERS } from '@/lib/constants';

export const Header = () => (
	<>
		<header className="absolute inset-x-0 top-0 z-50 h-16 bg-black px-4 text-white sm:h-20 sm:bg-transparent sm:px-10">
			<div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between">
				<HeaderLogo />
				<HeaderNavigation />
				<div className="flex items-center justify-center gap-7">
					<div className="mt-14 hidden flex-col gap-2 xl:flex">
						{PHONE_NUMBERS.map(phoneNumber => (
							<ContactPhoneButton key={phoneNumber} phoneNumber={phoneNumber} />
						))}
					</div>
					<HeaderShoppingCart />
				</div>
			</div>
		</header>
		<HeaderMobileNavigationButton />
	</>
);
