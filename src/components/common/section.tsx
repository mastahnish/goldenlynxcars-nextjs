import { Container } from './container';
import { Title } from './title';

import type { ComponentProps } from 'react';

type SectionProps = Readonly<{
	title: string;
	titleGap?: ComponentProps<typeof Title>['gap'];
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
		<Title gap={titleGap} label={label}>
			{title}
		</Title>
		{children}
	</Container>
);
