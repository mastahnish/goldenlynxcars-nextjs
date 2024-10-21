/* eslint-disable tailwindcss/no-arbitrary-value */

import { twJoin } from 'tailwind-merge';

import type { ReactNode } from 'react';

type TitleProps = Readonly<{
	gap?: 'small' | 'medium';
	label?: string | null;
	children: ReactNode;
}>;

export const Title = ({ gap = 'medium', label, children }: TitleProps) => (
	<h2
		style={{ ...(label && { '--label': `'${label}' / ''` }) }}
		className={twJoin(
			'relative w-fit font-bebas-neue text-5xl text-white xs:text-6xl md:text-7xl',
			label &&
				'after:text-stroke after:absolute after:-top-1.5 after:left-0 after:-translate-x-1/4 after:text-8xl after:text-background after:opacity-10 after:shadow-primary after:content-[--label] after:xs:-top-4 after:xs:text-9xl',
			gap === 'small' && 'mb-6',
			gap === 'medium' && 'mb-12',
		)}
	>
		{children}
	</h2>
);
