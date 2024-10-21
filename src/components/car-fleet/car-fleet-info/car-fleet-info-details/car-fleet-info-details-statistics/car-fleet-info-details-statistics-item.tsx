import type { ReactNode } from 'react';

type CarFleetInfoDetailsStatisticsItemProps = Readonly<{
	icon: ReactNode;
	content: string;
}>;

export const CarFleetInfoDetailsStatisticsItem = ({
	icon,
	content,
}: CarFleetInfoDetailsStatisticsItemProps) => (
	<li className="flex items-center gap-2.5 text-lg text-white">
		{icon}
		{content}
	</li>
);
