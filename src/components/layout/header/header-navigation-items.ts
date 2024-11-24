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
		href: '/flota-samochodow',
		label: 'Flota samochodów',
	},
	{
		href: '/sklep',
		label: 'Sklep z merchem',
	},
	{
		href: '/kalkulator-najmu',
		label: 'Kalkulator najmu',
	},
	{
		href: '/o-nas',
		label: 'O firmie',
	},
];
