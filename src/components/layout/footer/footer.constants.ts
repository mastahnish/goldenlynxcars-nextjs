import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

import type { LinkProps } from 'next/link';

import type { IconType } from '@/components/ui/icons';

export interface FooterSection {
	title: string;
	items: {
		href: LinkProps<unknown>['href'];
		label: string;
		isExternal?: boolean;
	}[];
}

export const footerSections: FooterSection[] = [
	{
		title: 'OFERTA',
		items: [
			{
				href: '/transfery-vip',
				label: 'Oferta transferów VIP',
			},
			{
				href: '/model-inwestorski',
				label: 'Model inwestorski',
			},
			{
				href: '#',
				label: 'Najem długoterminowy',
			},
			{
				href: '/subskrypcja-samochodowa',
				label: 'Subskrypcja samochodowa',
			},
		],
	},
	{
		title: 'MAPA STRONY',
		items: [
			{
				href: '/',
				label: 'Strona główna',
			},
			{
				href: '/#services',
				label: 'Usługi',
			},
			{
				href: '/sklep',
				label: 'Sklep',
			},
			{
				href: '/o-nas',
				label: 'O nas',
			},
			{
				href: '/kontakt',
				label: 'Kontakt',
			},
		],
	},
	{
		title: 'KONTAKT',
		items: [
			{
				href: '#',
				label: 'Polityka prywatności',
			},
			{
				href: 'maps:?q=Krótka 2/2, 84-230 Dębogórze',
				label: 'Dębogórze-Wybudowanie, ul. Krótka 2/2, 84-230',
			},
		],
	},
];

export interface FooterSocial {
	icon: IconType;
	href: string;
}

export const footerSocials: FooterSocial[] = [
	{
		icon: FaInstagram,
		href: 'https://www.instagram.com',
	},
	{
		icon: FaTwitter,
		href: 'https://x.com',
	},
	{
		icon: FaLinkedin,
		href: 'https://linkedin.com',
	},
	{
		icon: FaFacebook,
		href: 'https://www.facebook.com/',
	},
];
