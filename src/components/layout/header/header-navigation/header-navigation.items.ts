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
		href: '#',
		label: 'Flota samochodów',
	},
	{
		href: '#',
		label: 'Sklep z merchem',
	},
	{
		href: '#',
		label: 'Kalkulator najmu',
	},
	{
		href: '#',
		label: 'O firmie',
	},
];
