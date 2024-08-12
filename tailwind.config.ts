import defaultTheme from 'tailwindcss/defaultTheme';

import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				'bebas-neue': 'var(--font-bebas-neue)',
				sans: ['var(--font-bozon)', ...defaultTheme.fontFamily.sans],
			},
		},
	},
} satisfies Config;
