/* eslint-disable tailwindcss/no-arbitrary-value */

import { twJoin } from 'tailwind-merge';

import type { ReactNode } from 'react';

type SectionProps = Readonly<{
	id?: string;
	title: string;
	label?: string | null;
	children: ReactNode;
}>;

export const Section = ({ id, title, label, children }: SectionProps) => (
	<section
		id={id}
		className="w-full px-4 py-12 sm:px-8 md:mx-auto md:max-w-4xl lg:max-w-5xl xl:max-w-7xl"
	>
		<h2
			style={{ ...(label && { '--label': `'${label}' / ''` }) }}
			className={twJoin(
				'relative mb-8 font-bebas-neue text-5xl text-white xs:text-6xl md:text-7xl',
				label &&
					'after:text-stroke after:absolute after:-top-1.5 after:left-0 after:-z-1 after:-translate-x-1/4 after:text-8xl after:text-background after:opacity-5 after:shadow-secondary after:content-[--label] after:xs:-top-4 after:xs:text-9xl',
			)}
		>
			{title}
		</h2>
		{children}
	</section>
);
