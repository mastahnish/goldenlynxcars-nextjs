import { Toaster } from 'react-hot-toast';
import { twJoin } from 'tailwind-merge';

import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';

import { APP_NAME } from '@/lib/constants';
import { bebasNeue } from '@/lib/fonts/bebas-neue';
import { bozon } from '@/lib/fonts/bozon';
import { AppProviders } from '@/providers/app-providers';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '@/assets/styles/globals.css';
import 'yet-another-react-lightbox/styles.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const metadata: Metadata = {
	title: {
		template: `%s | ${APP_NAME}`,
		default: APP_NAME,
	},
	description:
		'Wypożyczalnia Aut Premium na Pomorzu. Oferujemy elastyczne terminy wynajmu, gwarantując nie tylko najwyższą jakość obsługi i wyjątkowy stan naszych pojazdów, ale również pełne zaufanie i bezpieczeństwo każdej usługi. Specjalizujemy się w transferach lotniskowych, przejazdach VIP oraz wynajmie samochodów na imprezy okolicznościowe. Wybierając Golden Lynx Cars, wybierasz niezawodność, komfort i zaufanie, na które możesz liczyć.',
	openGraph: {
		type: 'website',
		title:
			'Golden Lynx Cars |  Wypożyczalnia Aut Premium | Transport VIP | Gdańsk Sopot Gdynia Trójmiasto',
		description:
			'Wypożyczalnia Aut Premium na Pomorzu. Oferujemy elastyczne terminy wynajmu, gwarantując nie tylko najwyższą jakość obsługi i wyjątkowy stan naszych pojazdów, ale również pełne zaufanie i bezpieczeństwo każdej usługi. Specjalizujemy się w transferach lotniskowych, przejazdach VIP oraz wynajmie samochodów na imprezy okolicznościowe. Wybierając Golden Lynx Cars, wybierasz niezawodność, komfort i zaufanie, na które możesz liczyć.',
		siteName: APP_NAME,
		url: 'https://www.goldenlynxcars.com',
	},
};

export const viewport: Viewport = {
	themeColor: '#000',
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
	<html
		lang="pl"
		className={twJoin('scroll-smooth', bebasNeue.variable, bozon.variable)}
	>
		<body className="bg-background">
			<AppProviders>
				<Header />
				{children}
				<Footer />
				<Toaster position="top-right" />
			</AppProviders>
		</body>
	</html>
);

export default RootLayout;
