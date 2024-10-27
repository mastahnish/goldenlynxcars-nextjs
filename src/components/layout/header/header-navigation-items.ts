import type { LinkProps } from 'next/link';

export interface NavItem {
	href: LinkProps<unknown>['href'];
	label: string;
}

export const navItems: NavItem[] = [
	{
		href: '#',
		label: 'Usługi',
	},
	{
		href: '/car-fleet',
		label: 'Flota samochodów',
	},
	{
		href: '/shop',
		label: 'Sklep z merchem',
	},
	{
		href: '/rental-calculator',
		label: 'Kalkulator najmu',
	},
	{
		href: '/about-us',
		label: 'O firmie',
	},
];
