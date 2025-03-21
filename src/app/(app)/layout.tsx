import { Toaster } from 'react-hot-toast';
import { twJoin } from 'tailwind-merge';

import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';

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
	title: 'Golden Lynx Cars',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
