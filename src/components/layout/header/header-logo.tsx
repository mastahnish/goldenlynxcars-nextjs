import Link from 'next/link';

import Logo from '@/assets/svg/logo.svg';

export const HeaderLogo = () => (
	<Link
		href="/"
		aria-label="Przejdź do strony głównej"
		className="transition-transform duration-500 hover:scale-102"
	>
		<Logo aria-label="Logo" />
	</Link>
);
