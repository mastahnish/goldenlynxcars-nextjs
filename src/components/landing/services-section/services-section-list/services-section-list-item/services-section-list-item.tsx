import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

import { ServicesSectionListItemContent } from './services-section-list-item-content';
import { ServicesSectionListItemTitle } from './services-section-list-item-title';

import type { Service } from '../../services-section.types';

type ServicesSectionListItemProps = Readonly<{
	service: Service;
	isExpanded: boolean;
	onExpand: () => void;
}>;

export const ServicesSectionListItem = ({
	service,
	isExpanded,
	onExpand,
}: ServicesSectionListItemProps) => {
	const contentId = useId();

	return (
		<div
			className={twMerge('p-px rounded-2xl', isExpanded && 'bg-service-item')}
		>
			<div className="overflow-hidden rounded-2xl bg-background px-6 text-white md:px-10">
				<ServicesSectionListItemTitle
					service={service}
					isExpanded={isExpanded}
					contentId={contentId}
					onExpand={onExpand}
				/>
				<ServicesSectionListItemContent
					id={contentId}
					isExpanded={isExpanded}
					content={service.content}
				/>
			</div>
		</div>
	);
};
