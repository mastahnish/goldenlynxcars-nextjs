import defaultTheme from 'tailwindcss/defaultTheme';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/images/hero-background.png')",
				'hero-desktop': "url('/images/hero-background-desktop.png')",
				'service-item':
					'linear-gradient(264.72deg, #ca9f59 3.64%, #fff5e4 98.39%)',
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
				secondary: '#ca9f59',
				'semi-black': '#121212',
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
			zIndex: {
				1: '1',
			},
		},
	},
} satisfies Config;
