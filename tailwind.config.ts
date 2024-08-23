import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindAnimate from 'tailwindcss-animate';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				'form-field': '#292929',
			},
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
				select:
					'0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
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

			height: {
				'opinion-item': '21.5rem',
			},
			margin: {
				'opinion-item': '4.5rem',
			},
			scale: {
				102: '1.02',
			},
			screens: {
				xs: '475px',
			},
			textColor: {
				'form-field-placeholder': '#727272',
			},
			transitionProperty: {
				width: 'width',
			},
			zIndex: {
				1: '1',
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;
