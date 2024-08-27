import { Toaster } from 'react-hot-toast';
import { twJoin } from 'tailwind-merge';

import { Footer } from '@/components/layout/footer/footer';
import { Header } from '@/components/layout/header/header';

import { bebasNeue } from '@/lib/fonts/bebas-neue';
import { bozon } from '@/lib/fonts/bozon';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import '@/assets/styles/globals.css';

import 'swiper/css';
import 'swiper/css/pagination';

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
			<Header />
			{children}
			<Footer />
			<Toaster position="top-right" />
		</body>
	</html>
);

export default RootLayout;
