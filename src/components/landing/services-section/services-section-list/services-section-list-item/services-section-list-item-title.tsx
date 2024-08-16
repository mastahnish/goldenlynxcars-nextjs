import type { Service } from '../../services-section.types';

type ServicesSectionListItemTitleProps = Readonly<{
	service: Service;
	isExpanded: boolean;
	contentId: string;
	onExpand: () => void;
}>;

export const ServicesSectionListItemTitle = ({
	service,
	isExpanded,
	contentId,
	onExpand,
}: ServicesSectionListItemTitleProps) => (
	<button
		type="button"
		aria-controls={contentId}
		aria-expanded={isExpanded}
		onClick={onExpand}
		className="mt-3 w-full py-2 text-left text-xl font-semibold xs:text-2xl"
	>
		{service.title}
		{service.isNew && (
			<span className="font-normal text-secondary"> (nowość!)</span>
		)}
	</button>
);
