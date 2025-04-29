import type { LinkProps } from 'next/link';

import type { Flags } from '@/lib/flags';

export interface NavItem {
	href: LinkProps<unknown>['href'];
	label: string;
	flag?: Flags;
}

export const navItems: NavItem[] = [
	{
		href: '/#services',
		label: 'Usługi',
	},
	{
		href: '/flota-samochodow',
		label: 'Flota samochodów',
	},
	{
		href: '/sklep',
		label: 'Sklep z merchem',
		flag: 'shop',
	},
	{
		href: '/kalkulator-najmu',
		label: 'Kalkulator najmu',
	},
	{
		href: '/transfery-vip',
		label: 'Transfery VIP',
	},
	{
		href: '/o-nas',
		label: 'O firmie',
	},
];
