import { AnimatePresence, motion } from 'framer-motion';

import { ServicesSectionListItemContentFindOutMore } from './services-section-list-item-content-find-out-more';

type ServicesSectionListItemContentProps = Readonly<{
	id: string;
	isExpanded: boolean;
	content: string;
}>;

export const ServicesSectionListItemContent = ({
	id,
	isExpanded,
	content,
}: ServicesSectionListItemContentProps) => (
	<AnimatePresence initial={false}>
		{isExpanded && (
			<motion.div
				id={id}
				initial={{ height: 0 }}
				animate={{ height: 'auto' }}
				exit={{ height: 0 }}
				transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
				className="space-y-6"
			>
				<p className="pt-4 text-neutral-300">{content}</p>
				<div className="pb-4">
					<ServicesSectionListItemContentFindOutMore />
				</div>
			</motion.div>
		)}
	</AnimatePresence>
);
