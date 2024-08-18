import type { ReactNode } from 'react';

type CarFleetCardDetailsItemProps = Readonly<{
	icon: ReactNode;
	content: string;
}>;

export const CarFleetCardDetailsItem = ({
	icon,
	content,
}: CarFleetCardDetailsItemProps) => (
	<li className="flex items-center gap-2.5 text-white">
		{icon}
		{content}
	</li>
);
