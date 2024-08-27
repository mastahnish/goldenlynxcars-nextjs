/* eslint-disable tailwindcss/no-arbitrary-value */

import { twMerge } from 'tailwind-merge';

import { Container } from './container';

import type { ComponentProps } from 'react';

type SectionProps = Readonly<{
	title: string;
	titleGap?: 'small' | 'medium';
	label?: string | null;
}> &
	ComponentProps<typeof Container>;

export const Section = ({
	as = 'section',
	title,
	titleGap = 'medium',
	label,
	children,
	...props
}: SectionProps) => (
	<Container as={as} {...props}>
		<h2
			style={{ ...(label && { '--label': `'${label}' / ''` }) }}
			className={twMerge(
				'relative font-bebas-neue text-5xl text-white xs:text-6xl md:text-7xl',
				label &&
					'after:text-stroke after:absolute after:-top-1.5 after:left-0 after:-z-1 after:-translate-x-1/4 after:text-8xl after:text-background after:opacity-5 after:shadow-secondary after:content-[--label] after:xs:-top-4 after:xs:text-9xl',
				titleGap === 'small' && 'mb-6',
				titleGap === 'medium' && 'mb-12',
			)}
		>
			{title}
		</h2>
		{children}
	</Container>
);
