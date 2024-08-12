import { twJoin } from 'tailwind-merge';

import { bebasNeue } from '@/lib/fonts/bebas-neue';
import { bozon } from '@/lib/fonts/bozon';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/assets/styles/globals.css';

export const metadata: Metadata = {
	title: 'Golden Lynx Cars',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

type RootLayoutProps = Readonly<{
	children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => (
	<html lang="pl" className={twJoin(bebasNeue.variable, bozon.variable)}>
		<body>{children}</body>
	</html>
);

export default RootLayout;
