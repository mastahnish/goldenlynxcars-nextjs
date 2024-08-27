import { twMerge } from 'tailwind-merge';

import type { ReactNode } from 'react';

type ContainerProps = Readonly<{
	as?: keyof HTMLElementTagNameMap;
	id?: string;
	className?: string;
	children: ReactNode;
}>;

export const Container = ({
	as: As = 'div',
	id,
	className,
	children,
}: ContainerProps) => (
	<As
		id={id}
		className={twMerge(
			'w-full px-4 py-12 sm:px-8 md:mx-auto md:max-w-4xl lg:max-w-5xl xl:max-w-7xl',
			className,
		)}
	>
		{children}
	</As>
);
