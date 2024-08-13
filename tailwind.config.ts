import defaultTheme from 'tailwindcss/defaultTheme';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/images/hero-background.png')",
				'hero-desktop': "url('/images/hero-background-desktop.png')",
			},
			borderWidth: {
				3: '3px',
			},
			boxShadow: ({ theme }) => ({
				'hero-image': `inset 0px 50px 50px -10px ${theme('colors.background')}, inset 0px -50px 50px -10px ${theme('colors.background')}`,
			}),
			colors: {
				background: '#171717',
				primary: '#e3b262',
			},
			fontFamily: {
				'bebas-neue': 'var(--font-bebas-neue)',
				sans: ['var(--font-bozon)', ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				'10xl': '10rem',
			},
			scale: {
				102: '1.02',
			},
			screens: {
				xs: '475px',
			},
			transitionProperty: {
				width: 'width',
			},
		},
	},
} satisfies Config;
