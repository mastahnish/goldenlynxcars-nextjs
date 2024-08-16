'use client';

import { useState } from 'react';

import { ServicesSectionListItem } from './services-section-list-item/services-section-list-item';

import type { Service } from '../services-section.types';

type ServicesSectionListProps = Readonly<{
	services: Service[];
}>;

export const ServicesSectionList = ({ services }: ServicesSectionListProps) => {
	const [expandedService, setExpandedService] = useState<number | null>(null);

	return (
		<ul>
			{services.map((service, i) => (
				<li key={i}>
					<ServicesSectionListItem
						service={service}
						isExpanded={i === expandedService}
						onExpand={() =>
							setExpandedService(i !== expandedService ? i : null)
						}
					/>
				</li>
			))}
		</ul>
	);
};
